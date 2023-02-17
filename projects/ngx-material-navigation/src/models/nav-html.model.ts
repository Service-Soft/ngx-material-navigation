import { BaseNavElement, NavElementTypes } from './nav.model';

/**
 * Displays a custom html element.
 */
export interface NavHtml extends BaseNavElement {
    /**
     * The type of the element.
     */
    type: NavElementTypes.HTML,

    /**
     * The custom html-element.
     */
    html: string
}