import { NavMenuElement } from './nav-menu.model';

/**
 * Displays a simple string text.
 */
export interface NavTextElement {
    /**
     * The type of the element.
     */
    type: 'text',
    /**
     * The position of the element.
     */
    position?: 'left' | 'center' | 'right',
    /**
     * A condition that must be met for the element to be displayed.
     */
    condition?: () => boolean,
    /**
     * The text content to display.
     */
    text: string
}

/**
 * One of the NavElements for the footer.
 * As these are always stacked the 'collapse' value is omitted.
 */
export type NavFooterElement = NavMenuElement | NavTextElement;

/**
 * A row with multiple elements.
 * Used to display a footer row.
 */
export interface FooterRow {
    /**
     * The elements inside the row.
     */
    elements: NavFooterElement[]
}