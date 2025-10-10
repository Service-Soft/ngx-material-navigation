import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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

    constructor(private readonly router: Router) {
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
        for (const r of route.snapshot.pathFromRoot) {
            const data: DefaultNavRouteDataType = r.data;
            breadcrumbs.push({
                name: data.breadcrumbConfig?.name ?? r.title ?? 'Start',
                route: r.url.map(segment => segment.path).join('/'),
                icon: data.breadcrumbConfig?.icon,
                ariaLabel: data.breadcrumbConfig?.ariaLabel
            });
            if (data.pageNotFoundConfig) {
                this.breadcrumbsSubject.next([]);
                return;
            }
        }

        const [first, second] = [...breadcrumbs];
        if (breadcrumbs.length === 2 && first.route === '' && second.route === '') {
            this.breadcrumbsSubject.next([]);
            return;
        }

        this.breadcrumbsSubject.next(breadcrumbs);
    }
}