import { Route, Routes } from '@angular/router';
import { NavButton } from '../models/nav-button.model';
import { NavMenu, NavMenuElement } from '../models/nav-menu.model';
import { NavImage, NavImageWithExternalLink, NavImageWithInternalLink } from '../models/nav-image.model';
import { NavTitle, NavTitleWithExternalLink, NavTitleWithInternalLink } from '../models/nav-title.model';
import { NavElement } from '../models/nav.model';
import { NavExternalLink, NavInternalLink } from '../models/nav-link.model';
import { NavbarRow } from '../models/navbar.model';

/**
 * Contains HelperMethods around handling Navigation.
 */
export abstract class NavUtilities {

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asTitle(element: NavElement): NavTitle {
        return element as NavTitle;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asAngularRoute(route: Route | string): Route {
        return route as Route;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asStringRoute(route: Route | string): string {
        return route as string;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asInternalLink(element: NavElement | NavMenuElement): NavInternalLink {
        return element as NavInternalLink;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asExternalLink(element: NavElement | NavMenuElement): NavExternalLink {
        return element as NavExternalLink;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asMenu(element: NavElement | NavMenuElement): NavMenu {
        return element as NavMenu;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asButton(element: NavElement): NavButton {
        return element as NavButton;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asImage(element: NavElement): NavImage {
        return element as NavImage;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asImageWithInternalLink(element: NavElement): NavImageWithInternalLink {
        return element as NavImageWithInternalLink;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asImageWithExternalLink(element: NavElement): NavImageWithExternalLink {
        return element as NavImageWithExternalLink;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asTitleWithInternalLink(element: NavElement): NavTitleWithInternalLink {
        return element as NavTitleWithInternalLink;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    static asTitleWithExternalLink(element: NavElement): NavTitleWithExternalLink {
        return element as NavTitleWithExternalLink;
    }

    /**
     * Checks if the provided element is a NavInternalLink.
     *
     * @param element - The element to check.
     * @returns Whether or not the given element is a NavInternalLink.
     */
    static isInternalLink(element: NavElement): element is NavInternalLink {
        if ((element as NavInternalLink).route) {
            return true;
        }
        return false;
    }

    /**
     * Checks if the provided element is a NavMenu.
     *
     * @param element - The element to check.
     * @returns Whether or not the given element is a NavMenu.
     */
    static isMenu(element: NavElement): element is NavMenu {
        if ((element as NavMenu).elements) {
            return true;
        }
        return false;
    }

    /**
     * Checks if the provided value is an angular route.
     *
     * @param route - The value to check.
     * @returns Whether or not the given value is an angular route.
     */
    static isAngularRoute(route: Route | string): route is Route {
        if ((route as Route).path) {
            return true;
        }
        return false;
    }

    /**
     * Checks if the provided element is a NavElement.
     *
     * @param value - The element to check.
     * @returns Whether or not the given element is a NavElement.
     */
    static isNavElement(value: NavElement | NavbarRow): value is NavElement {
        if ((value as NavElement).type) {
            return true;
        }
        return false;
    }

    /**
     * Gets the angular routes.
     * Extracts them from the navbarRows and adds any additional routes provided in additionalRoutes.
     *
     * @param navbarRows - The NavbarRows used as a configuration for the navbar element.
     * @param additionalRoutes - Any additional routes that aren't included in the NavbarRows.
     * @returns All found angular routes.
     */
    static getAngularRoutes(navbarRows: NavbarRow[] = [], additionalRoutes: Routes = []): Routes {
        let allRoutes: Routes = [];
        allRoutes = allRoutes.concat(NavUtilities.getRoutesFromNavbar(navbarRows));
        allRoutes = allRoutes.concat(additionalRoutes);
        // Filters to only contain unique paths
        const uniquePaths: string[] = [];
        const res: Routes = [];
        for (const route of allRoutes) {
            if (!uniquePaths.find(r => r === route.path)) {
                res.push(route);
            }
        }
        return res;
    }

    private static getRoutesFromNavbar(navbarRows: NavbarRow[]): Routes {
        let res: Routes = [];
        for (const row of navbarRows) {
            res = res.concat(NavUtilities.getRoutesFromElements(row.elements));
        };
        return res;
    }

    private static getRoutesFromElements(elements: NavElement[]): Routes {
        let res: Routes = [];
        const internalLinks: NavInternalLink[] = elements.filter(e => NavUtilities.isInternalLink(e)) as NavInternalLink[];
        const angularRoutes: Routes = internalLinks.filter(l => NavUtilities.isAngularRoute(l.route)).map(l => l.route) as Routes;
        res = res.concat(angularRoutes);
        const menus: NavMenu[] = elements.filter(e => NavUtilities.isMenu(e)) as NavMenu[];
        for (const menu of menus) {
            res = res.concat(NavUtilities.getRoutesFromElements(menu.elements as NavElement[]));
        }
        return res;
    }

    /**
     * Get all elements at the provided position with the provided screenWidth from the given elements.
     *
     * @param position - The position for which to get the elements.
     * @param screenWidth - The current screen width. Is needed to hide elements that are already collapsed into the sidenav.
     * @param rows - The rows to get the elements from.
     * @returns All Elements for the provided input.
     */
    static getNavbarElements(
        position: 'left' | 'center' | 'right',
        screenWidth: 'lg' | 'md' | 'sm',
        rows?: NavbarRow[]
    ): NavElement[] {
        if (!rows || !rows.length) {
            return [];
        }
        let res: NavElement[] = [];
        for (const row of rows ) {
            res = res.concat(row.elements);
        }

        if (position === 'left') {
            res = res.filter(e => !e.position || e.position === position);
        }
        else {
            res = res.filter(e => e.position === position);
        }
        switch (screenWidth) {
            case 'lg':
                return res.filter(e => e.collapse !== 'always' && e.collapse !== 'lg');
            case 'md':
                return res.filter(e => e.collapse !== 'always' && e.collapse !== 'lg' && e.collapse !== 'md');
            case 'sm':
                return res.filter(e => e.collapse !== 'always' && e.collapse !== 'lg' && e.collapse !== 'md' && e.collapse !== 'sm');
        }
    }

    /**
     * Gets all the elements to display in the sidenav.
     *
     * @param screenWidth - The current screen width.
     * @param rows - The rows to get the elements from.
     * @returns The NavElements to display in the sidenav.
     */
    static getSidenavElements(screenWidth: 'lg' | 'md' | 'sm', rows?: NavbarRow[]): NavElement[] {
        if (!rows || !rows.length) {
            return [];
        }
        let res: NavElement[] = [];
        for (const row of rows) {
            res = res.concat(row.elements);
        }
        switch (screenWidth) {
            case 'lg':
                return res.filter(e => e.collapse === 'always' || e.collapse === 'lg');
            case 'md':
                return res.filter(e => e.collapse === 'always' || e.collapse === 'lg' || e.collapse === 'md');
            case 'sm':
                return res.filter(e => e.collapse === 'always' || e.collapse === 'lg' || e.collapse === 'md' || e.collapse === 'sm');
        }
    }
}