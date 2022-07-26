import { BaseNavElement } from './nav.model';

/**
 * Displays a custom html element.
 */
export interface NavHtml extends BaseNavElement {
    /**
     * The type of the element.
     */
    type: 'html',

    /**
     * The custom html-element.
     */
    html: string
}