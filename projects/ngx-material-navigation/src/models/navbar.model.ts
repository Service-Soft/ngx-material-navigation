import { NavElement } from './nav.model';

/**
 * A row with multiple elements.
 * Used to display a single mat-toolbar row.
 */
export interface NavbarRow {
    /**
     * The elements inside the row.
     */
    elements: NavElement[]
}