import { EnvironmentInjector, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

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

    constructor(private readonly injector: EnvironmentInjector, private readonly router: Router) {
        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                let route: ActivatedRoute | null = this.router.routerState.root.firstChild;
                while (route?.firstChild) {
                    route = route.firstChild;
                }
                const data: DefaultNavRouteDataType | undefined = route?.snapshot.data;
                this.anchorsSubject.next(data?.anchors ?? []);
            }
        });
    }

}