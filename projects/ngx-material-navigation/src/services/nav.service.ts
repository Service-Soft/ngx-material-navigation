import { EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Route, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { Breadcrumb } from '../models/breadcrumb.model';
import { NavElementTypes } from '../models/nav-element.model';
import { NavInternalLink } from '../models/nav-link.model';
import { DefaultNavRouteDataType, NavAnchor } from '../models/nav-route.model';
import { NavbarRow } from '../models/navbar.model';

/**
 * The service that contains information and functionality about he navigation data.
 */
@Injectable({ providedIn: 'root' })
export class NgxMatNavigationService {

    /**
     * The subject of the anchors of the current page.
     */
    readonly anchorsSubject: BehaviorSubject<NavAnchor[]> = new BehaviorSubject<NavAnchor[]>([]);

    /**
     * The subject of the anchors of the current page.
     */
    readonly breadcrumbsSubject: BehaviorSubject<Breadcrumb[]> = new BehaviorSubject<Breadcrumb[]>([]);

    private get currentRoute(): string {
        return this.router.url.split('#')[0];
    }

    // eslint-disable-next-line jsdoc/require-returns
    /**
     * The anchor row, dynamically generated from the current route.
     */
    get anchorRow(): NavbarRow {
        const elements: NavInternalLink[] = this.anchorsSubject.value.map(a => {
            return {
                type: NavElementTypes.INTERNAL_LINK,
                route: this.currentRoute,
                collapse: 'never',
                ...a
            };
        });
        return {
            elements: elements
        };
    }

    // eslint-disable-next-line jsdoc/require-returns
    /**
     * The breadcrumbs, dynamically generated from the current route.
     */
    get breadcrumbs(): Breadcrumb[] {
        return this.breadcrumbsSubject.value;
    }

    constructor(private readonly router: Router, private readonly injector: EnvironmentInjector) {
        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.updateAnchors();
                this.updateBreadcrumbs();
            }
        });
    }

    private updateAnchors(): void {
        let route: ActivatedRoute | null = this.router.routerState.root.firstChild;
        while (route?.firstChild) {
            route = route.firstChild;
        }
        const data: DefaultNavRouteDataType | undefined = route?.snapshot.data;
        this.anchorsSubject.next(data?.anchors ?? []);
    }

    private updateBreadcrumbs(): void {
        const route: ActivatedRoute | null = this.router.routerState.root.firstChild;
        if (!route) {
            this.breadcrumbsSubject.next([]);
            return;
        }

        const breadcrumbs: Breadcrumb[] = [];
        for (const snapshot of route.snapshot.pathFromRoot) {
            const data: DefaultNavRouteDataType = snapshot.data;
            if (data.pageNotFoundConfig) {
                this.breadcrumbsSubject.next([]);
                return;
            }

            breadcrumbs.push({
                name: this.resolveBreadcrumbName(data, undefined, snapshot),
                route: snapshot.url.map(segment => segment.path).join('/'),
                icon: data.breadcrumbConfig?.icon,
                ariaLabel: data.breadcrumbConfig?.ariaLabel
            });

            if (data.breadcrumbConfig?.parentRoute && !breadcrumbs.find(b => b.route === data.breadcrumbConfig?.parentRoute)) {
                const parentRoute: Route | undefined = this.router.config.find(r => r.path === data.breadcrumbConfig?.parentRoute);

                if (!parentRoute) {
                    throw new Error('parent route could not be resolved');
                }

                const parentData: DefaultNavRouteDataType | undefined = parentRoute.data;
                breadcrumbs.splice(breadcrumbs.length - 1, 0, {
                    name: this.resolveBreadcrumbName(parentData, parentRoute, undefined),
                    route: data.breadcrumbConfig?.parentRoute,
                    icon: parentData?.breadcrumbConfig?.icon,
                    ariaLabel: parentData?.breadcrumbConfig?.ariaLabel
                });
            }
        }

        this.breadcrumbsSubject.next(breadcrumbs);
    }

    private resolveBreadcrumbName(
        navData: DefaultNavRouteDataType | undefined,
        route: Route | undefined,
        snapshot: ActivatedRouteSnapshot | undefined
    ): string {
        const res: string | undefined = runInInjectionContext(this.injector, () => {
            if (navData?.breadcrumbConfig?.name == undefined) {
                return undefined;
            }
            if (typeof navData.breadcrumbConfig.name === 'string') {
                return navData.breadcrumbConfig.name;
            }

            const route: ActivatedRoute = inject(ActivatedRoute);
            console.debug('snapshot', snapshot, 'route.snapshot', route.snapshot);
            return navData.breadcrumbConfig.name(snapshot ?? route.snapshot, this.router.routerState.snapshot);
        });
        if (res) {
            return res;
        }

        if (snapshot) {
            return snapshot.title ?? 'Start';
        }

        if (route) {
            if (route.title == undefined) {
                return 'Start';
            }
            if (typeof route.title === 'string') {
                return route.title;
            }
        }

        return 'Start';
    }
}