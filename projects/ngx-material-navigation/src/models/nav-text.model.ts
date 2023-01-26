import { BaseNavElement, NavElementTypes } from './nav.model';

/**
 * The definition for a simple text to display eg. Inside the footer.
 */
export interface NavText extends BaseNavElement {
    // eslint-disable-next-line jsdoc/require-jsdoc
    type: NavElementTypes.TEXT,
    /**
     * The paragraphs that should be displayed.
     */
    paragraphs: string[]
}