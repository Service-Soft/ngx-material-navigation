import { BaseNavElement } from './nav.model';
import { NavTitle, NavTitleWithExternalLink, NavTitleWithInternalLink } from './nav-title.model';
import { NavImage, NavImageWithExternalLink, NavImageWithInternalLink } from './nav-image.model';
import { NavButton } from './nav-button.model';
import { NavInternalLink, NavExternalLink } from './nav-link.model';
import { NavHtml } from './nav-html.model';

/**
 * One of the NavElements for the menu.
 * As these are always stacked the 'collapse' value is omitted.
 */
export type NavMenuElement =
    Omit<NavTitle, 'collapse'> | Omit<NavTitleWithInternalLink, 'collapse'> | Omit<NavTitleWithExternalLink, 'collapse'> |
    Omit<NavImage, 'collapse'> | Omit<NavImageWithExternalLink, 'collapse'> | Omit<NavImageWithInternalLink, 'collapse'> |
    Omit<NavButton, 'collapse'> | Omit<NavInternalLink, 'collapse'> | Omit<NavExternalLink, 'collapse'> | Omit<NavMenu, 'collapse'> |
    Omit<NavHtml, 'collapse'>;

/**
 * An Menu used to display multiple elements under a single element.
 */
export interface NavMenu extends BaseNavElement {
    // eslint-disable-next-line jsdoc/require-jsdoc
    type: 'menu',
    /**
     * The name to display for the menu.
     */
    name: string,
    /**
     * The elements inside the menu.
     */
    elements: NavMenuElement[],
    /**
     * An icon to display left of the menu.
     */
    icon?: string
}