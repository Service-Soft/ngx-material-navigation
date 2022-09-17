import { EnvironmentInjector, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavbarRow } from '../models/navbar.model';
import { NavElement } from '../models/nav.model';
import { FooterRow, NavFooterElement } from '../models/footer.model';

/**
 * The service that contains information and functionality about he navigation data.
 */
@Injectable({providedIn: 'root'})
export class NgxMatNavigationService {
    /**
     * The subject of the currently visible navbar rows.
     */
    readonly navbarRowsSubject: BehaviorSubject<NavbarRow[]> = new BehaviorSubject<NavbarRow[]>([]);

    /**
     * The subject of the currently visible sidenav elements.
     */
    readonly footerRowsSubject: BehaviorSubject<FooterRow[]> = new BehaviorSubject<FooterRow[]>([]);

    constructor(private readonly injector: EnvironmentInjector) { }

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
        return navbarRows.filter(r => !emptyRows.includes(r));
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
            res = res.filter(e => !e.position || e.position === position);
        }
        else {
            res = res.filter(e => e.position === position);
        }
        return res;
    }
}