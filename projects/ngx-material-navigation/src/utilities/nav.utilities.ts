import { Route } from '@angular/router';
import { NavButton } from '../models/nav-button.model';
import { NavMenu, NavMenuElement } from '../models/nav-menu.model';
import { NavImage, NavImageWithExternalLink, NavImageWithInternalLink } from '../models/nav-image.model';
import { NavTitle, NavTitleWithExternalLink, NavTitleWithInternalLink } from '../models/nav-title.model';
import { NavElement } from '../models/nav.model';
import { NavExternalLink, NavInternalLink } from '../models/nav-link.model';
import { NavbarRow } from '../models/navbar.model';
import { NavFooterElement, NavTextElement } from '../models/footer.model';
import { NavHtml } from '../models/nav-html.model';
import { NavRoute } from '../models/nav-route.model';

/**
 * Contains HelperMethods around handling Navigation.
 */
export abstract class NavUtilities {

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asAngularRoute(route: Route | string): Route {
        return route as Route;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asStringRoute(route: Route | string): string {
        return route as string;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asTitle(element: NavElement | NavMenuElement | NavFooterElement): NavTitle {
        return element as NavTitle;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asText(element: NavElement | NavMenuElement | NavFooterElement): NavTextElement {
        return element as NavTextElement;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asInternalLink(element: NavElement | NavMenuElement | NavFooterElement): NavInternalLink {
        return element as NavInternalLink;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asExternalLink(element: NavElement | NavMenuElement | NavFooterElement): NavExternalLink {
        return element as NavExternalLink;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asMenu(element: NavElement | NavMenuElement | NavFooterElement): NavMenu {
        return element as NavMenu;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asButton(element: NavElement | NavMenuElement | NavFooterElement): NavButton {
        return element as NavButton;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asImage(element: NavElement | NavMenuElement | NavFooterElement): NavImage {
        return element as NavImage;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asImageWithInternalLink(element: NavElement | NavMenuElement | NavFooterElement): NavImageWithInternalLink {
        return element as NavImageWithInternalLink;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asImageWithExternalLink(element: NavElement | NavMenuElement | NavFooterElement): NavImageWithExternalLink {
        return element as NavImageWithExternalLink;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asTitleWithInternalLink(element: NavElement | NavMenuElement | NavFooterElement): NavTitleWithInternalLink {
        return element as NavTitleWithInternalLink;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asTitleWithExternalLink(element: NavElement | NavMenuElement | NavFooterElement): NavTitleWithExternalLink {
        return element as NavTitleWithExternalLink;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static isInternalLink(element: NavElement): element is NavInternalLink {
        return Object.keys(element).includes('route');
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static isMenu(element: NavElement): element is NavMenu {
        return Object.keys(element).includes('elements');
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static isAngularRoute(route: Route | string): route is Route {
        return Object.keys(route).includes('path');
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static isNavHtml(value: NavElement | NavFooterElement): value is NavHtml {
        return Object.keys(value).includes('html');
    }

    /**
     * Gets the angular routes.
     * Extracts them from the navbarRows and adds any additional routes provided in additionalRoutes.
     *
     * @param navbarRows - The NavbarRows used as a configuration for the navbar element.
     * @param additionalRoutes - Any additional routes that aren't included in the NavbarRows.
     * @returns All found angular routes.
     */
    static getAngularRoutes<RouteType extends Route = NavRoute>(
        navbarRows: NavbarRow[] = [],
        additionalRoutes: RouteType[] = []
    ): RouteType[] {
        let allRoutes: RouteType[] = [];
        allRoutes = allRoutes.concat(NavUtilities.getRoutesFromNavbar<RouteType>(navbarRows));
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

    private static getRoutesFromElements<RouteType extends Route>(elements: NavElement[]): RouteType[] {
        let res: RouteType[] = [];
        const internalLinks: NavInternalLink[] = elements.filter(e => NavUtilities.isInternalLink(e)) as NavInternalLink[];
        const angularRoutes: RouteType[] = internalLinks.filter(l => NavUtilities.isAngularRoute(l.route)).map(l => l.route) as RouteType[];
        res = res.concat(angularRoutes);
        const menus: NavMenu[] = elements.filter(e => NavUtilities.isMenu(e)) as NavMenu[];
        for (const menu of menus) {
            res = res.concat(NavUtilities.getRoutesFromElements<RouteType>(menu.elements as NavElement[]));
        }
        return res;
    }
}