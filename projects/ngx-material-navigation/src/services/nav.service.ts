import { EnvironmentInjector, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FooterRow, NavFooterElement } from '../models/footer.model';
import { NavInternalLink } from '../models/nav-link.model';
import { DefaultNavRouteDataType, NavAnchor } from '../models/nav-route.model';
import { NavElement, NavElementTypes } from '../models/nav.model';
import { NavbarRow } from '../models/navbar.model';

/**
 * The service that contains information and functionality about he navigation data.
 */
@Injectable({ providedIn: 'root' })
export class NgxMatNavigationService {
    /**
     * The subject of the currently visible navbar rows.
     */
    readonly navbarRowsSubject: BehaviorSubject<NavbarRow[]> = new BehaviorSubject<NavbarRow[]>([]);

    /**
     * The subject of the anchors of the current page.
     */
    readonly anchorsSubject: BehaviorSubject<NavAnchor[]> = new BehaviorSubject<NavAnchor[]>([]);

    /**
     * The subject of the currently visible sidenav elements.
     */
    readonly footerRowsSubject: BehaviorSubject<FooterRow[]> = new BehaviorSubject<FooterRow[]>([]);

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
                // eslint-disable-next-line max-len
                let route: ActivatedRoute | null = this.router.routerState.root.firstChild;
                while (route?.firstChild) {
                    route = route.firstChild;
                }
                const data: DefaultNavRouteDataType | undefined = route?.snapshot.data;
                this.anchorsSubject.next(data?.anchors ?? []);
            }
        });
    }

    /**
     * Gets the rows that are really displayed in the navbar and not collapsed to the sidenav.
     *
     * @param navbarRows - All navbar rows, including the ones collapsed to the sidenav.
     * @param screenWidthName - Name of the current width of the screen.
     * @returns All rows that are displayed inside the navbar.
     */
    getNavbarRows(navbarRows: NavbarRow[], screenWidthName: 'lg' | 'md' | 'sm'): NavbarRow[] {
        const emptyRows: NavbarRow[] = navbarRows.filter(r =>
            !this.getNavbarElementsForRow('left', screenWidthName, r).length
            && !this.getNavbarElementsForRow('center', screenWidthName, r).length
            && !this.getNavbarElementsForRow('right', screenWidthName, r).length
        );
        return navbarRows.concat(this.anchorRow).filter(r => !emptyRows.includes(r));
    }

    /**
     * Get all elements at the provided position with the provided screenWidth from the given elements.
     *
     * @param position - The position for which to get the elements.
     * @param screenWidthName - Name of the current width of the screen.
     * @param row - The row to get the elements from.
     * @returns All Elements for the provided input.
     */
    getNavbarElementsForRow(position: 'left' | 'center' | 'right', screenWidthName: 'lg' | 'md' | 'sm', row: NavbarRow): NavElement[] {
        let res: NavElement[] = [];
        res = res.concat(row.elements);
        res = res.filter(e => this.checkCondition(e));

        if (position === 'left') {
            res = res.filter(e => !e.position || e.position === position);
        }
        else {
            res = res.filter(e => e.position === position);
        }
        switch (screenWidthName) {
            case 'lg':
                return res.filter(e => e.collapse !== 'always' && e.collapse !== 'lg');
            case 'md':
                return res.filter(e => e.collapse !== 'always' && e.collapse !== 'lg' && e.collapse !== 'md');
            case 'sm':
                return res.filter(e => e.collapse === 'never');
        }
    }

    private checkCondition(element: NavElement | NavFooterElement): boolean {
        if (!element.condition) {
            return true;
        }
        // runInContext(...) is needed to enable the user to use injections in his condition functions.
        return this.injector.runInContext(() => element.condition ? element.condition() : true);
    }

    /**
     * Gets all the elements to display in the sidenav.
     *
     * @param rows - The rows to get the elements from.
     * @param screenWidthName - Name of the current width of the screen.
     * @returns The NavElements to display in the sidenav.
     */
    getSidenavElements(rows: NavbarRow[], screenWidthName: 'lg' | 'md' | 'sm'): NavElement[] {
        let res: NavElement[] = [];
        for (const row of rows) {
            res = res.concat(row.elements);
        }
        res = res.filter(e => this.checkCondition(e));
        switch (screenWidthName) {
            case 'lg':
                return res.filter(e => e.collapse === 'always' || e.collapse === 'lg');
            case 'md':
                return res.filter(e => e.collapse === 'always' || e.collapse === 'lg' || e.collapse === 'md');
            case 'sm':
                // eslint-disable-next-line max-len
                return res.filter(e => !e.collapse || e.collapse === 'always' || e.collapse === 'lg' || e.collapse === 'md' || e.collapse === 'sm');
        }
    }

    /**
     * Get all elements at the provided position from the given elements.
     *
     * @param position - The position for which to get the elements.
     * @param row - The row to get the elements from.
     * @returns All Elements for the provided input.
     */
    getFooterElementsForRow(position: 'left' | 'center' | 'right', row: FooterRow): NavFooterElement[] {
        let res: NavFooterElement[] = [];
        res = res.concat(row.elements);
        res = res.filter(e => this.checkCondition(e));

        if (position === 'left') {
            return res.filter(e => !e.position || e.position === position);
        }
        return res.filter(e => e.position === position);
    }
}