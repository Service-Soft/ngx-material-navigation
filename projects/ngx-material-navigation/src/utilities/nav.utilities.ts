import { Route } from '@angular/router';
import { FooterRow, NavFooterElement } from '../models/footer.model';
import { NavInternalLink } from '../models/nav-link.model';
import { NavMenu, NavMenuElement } from '../models/nav-menu.model';
import { NavRoute } from '../models/nav-route.model';
import { NavElement } from '../models/nav.model';
import { NavbarRow } from '../models/navbar.model';

/**
 * Contains HelperMethods around handling Navigation.
 */
export abstract class NavUtilities {
    // eslint-disable-next-line jsdoc/require-jsdoc
    static asMenu(element: NavElement | NavMenuElement | NavFooterElement): NavMenu {
        return element as NavMenu;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static isInternalLink(element: NavElement | NavFooterElement): element is NavInternalLink {
        return Object.keys(element).includes('route');
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static isMenu(element: NavElement | NavFooterElement): element is NavMenu {
        return Object.keys(element).includes('elements');
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static isAngularRoute(route: Route | string): route is Route {
        return Object.keys(route).includes('path');
    }

    /**
     * Gets the angular routes.
     * Extracts them from the navbar and footer rows and adds any additional routes provided in additionalRoutes.
     *
     * @param navbarRows - The NavbarRows used as a configuration for the navbar element.
     * @param footerRows - The FooterRows used as a configuration for the footer element.
     * @param additionalRoutes - Any additional routes that aren't included in the navbar or footer rows.
     * @returns All found angular routes.
     */
    static getAngularRoutes<RouteType extends Route = NavRoute>(
        navbarRows: NavbarRow[] = [],
        footerRows: FooterRow[] = [],
        additionalRoutes: RouteType[] = []
    ): RouteType[] {
        let allRoutes: RouteType[] = [];
        allRoutes = allRoutes.concat(NavUtilities.getRoutesFromNavbar<RouteType>(navbarRows));
        allRoutes = allRoutes.concat(NavUtilities.getRoutesFromFooter<RouteType>(footerRows));
        allRoutes = allRoutes.concat(additionalRoutes);
        // Filters to only contain unique paths
        const uniquePaths: string[] = [];
        const res: RouteType[] = [];
        for (const route of allRoutes) {
            if (!uniquePaths.find(r => r === route.path)) {
                res.push(route);
            }
        }
        return res;
    }

    private static getRoutesFromNavbar<RouteType extends Route>(navbarRows: NavbarRow[]): RouteType[] {
        let res: RouteType[] = [];
        for (const row of navbarRows) {
            res = res.concat(NavUtilities.getRoutesFromElements<RouteType>(row.elements));
        }
        return res;
    }

    private static getRoutesFromFooter<RouteType extends Route>(footerRows: FooterRow[]): RouteType[] {
        let res: RouteType[] = [];
        for (const row of footerRows) {
            res = res.concat(NavUtilities.getRoutesFromElements<RouteType>(row.elements));
        }
        return res;
    }

    private static getRoutesFromElements<RouteType extends Route>(elements: NavElement[] | NavFooterElement[]): RouteType[] {
        let res: RouteType[] = [];
        const internalLinks: NavInternalLink[] = elements.filter(e => NavUtilities.isInternalLink(e)) as NavInternalLink[];
        const angularRoutes: RouteType[] = internalLinks.filter(l => NavUtilities.isAngularRoute(l.route)).map(l => l.route) as RouteType[];
        res = res.concat(angularRoutes);
        const menus: NavMenu[] = elements.filter(e => NavUtilities.isMenu(e)) as NavMenu[];
        for (const menu of menus) {
            res = res.concat(NavUtilities.getRoutesFromElements<RouteType>(menu.elements));
        }
        return res;
    }
}