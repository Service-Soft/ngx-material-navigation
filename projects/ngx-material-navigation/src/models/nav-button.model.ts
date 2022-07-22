import { NavLink } from './nav-link.model';

/**
 * The definition for a nav button.
 */
export interface NavButton extends NavLink {
    // eslint-disable-next-line jsdoc/require-jsdoc
    type: 'button',
    /**
     * What to do when the button is clicked.
     */
    action: (...args: unknown[]) => unknown
}