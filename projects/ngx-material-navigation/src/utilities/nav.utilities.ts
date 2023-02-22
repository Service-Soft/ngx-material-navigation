import { Route } from '@angular/router';
import { FooterRow, NavFooterElement } from '../models/footer.model';
import { NavInternalLink } from '../models/nav-link.model';
import { NavMenu, NavMenuElement } from '../models/nav-menu.model';
import { NavRoute } from '../models/nav-route.model';
import { NavElement, NavElementTypes } from '../models/nav.model';
import { NavbarRow } from '../models/navbar.model';
import { NavTitleWithInternalLink } from '../models/nav-title.model';
import { NavImageWithInternalLink } from '../public-api';

/**
 * Contains HelperMethods around handling Navigation.
 */
export abstract class NavUtilities {
    // eslint-disable-next-line jsdoc/require-jsdoc
    static asMenu(element: NavElement | NavMenuElement | NavFooterElement): NavMenu {
        return element as NavMenu;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static isMenu(element: NavElement | NavFooterElement): element is NavMenu {
        return Object.keys(element).includes('elements');
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    private static isAngularRoute(route: Route | string): route is Route {
        return typeof route !== 'string';
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

        const linksRoutes: (string | NavRoute)[] = NavUtilities.findInternalLinksFromElements(elements).map(l => l.route);
        res = res.concat(linksRoutes.filter(r => NavUtilities.isAngularRoute(r)) as RouteType[]);

        const titleLinksRoutes: (string | NavRoute)[] = NavUtilities.findTitleLinksFromElements(elements).map(l => l.link.route);
        res = res.concat(titleLinksRoutes.filter(r => NavUtilities.isAngularRoute(r)) as RouteType[]);

        const imageLinksRoutes: (string | NavRoute)[] = NavUtilities.findImageLinksFromElements(elements).map(l => l.link.route);
        res = res.concat(imageLinksRoutes.filter(r => NavUtilities.isAngularRoute(r)) as RouteType[]);

        const menus: NavMenu[] = elements.filter(e => e.type === NavElementTypes.MENU) as NavMenu[];
        for (const menu of menus) {
            res = res.concat(NavUtilities.getRoutesFromElements<RouteType>(menu.elements));
        }
        return res;
    }

    private static findImageLinksFromElements(elements: NavElement[] | NavMenuElement[]): NavImageWithInternalLink[] {
        return elements.filter(e => e.type === NavElementTypes.IMAGE_WITH_INTERNAL_LINK) as NavImageWithInternalLink[];
    }

    private static findTitleLinksFromElements(elements: NavElement[] | NavMenuElement[]): NavTitleWithInternalLink[] {
        return elements.filter(e => e.type === NavElementTypes.TITLE_WITH_INTERNAL_LINK) as NavTitleWithInternalLink[];
    }

    private static findInternalLinksFromElements(elements: NavElement[]): NavInternalLink[] {
        return elements.filter(e => e.type === NavElementTypes.INTERNAL_LINK) as NavInternalLink[];
    }
}