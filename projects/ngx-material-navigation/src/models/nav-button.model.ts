import { NavLink } from './nav-link.model';
import { NavElementTypes } from './nav.model';

/**
 * The definition for a nav button.
 */
export interface NavButton extends NavLink {
    // eslint-disable-next-line jsdoc/require-jsdoc
    type: NavElementTypes.BUTTON | NavElementTypes.BUTTON_FLAT,
    /**
     * What to do when the button is clicked.
     */
    action: (...args: unknown[]) => unknown
}