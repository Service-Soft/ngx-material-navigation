import { NavButton } from './nav-button.model';
import { NavHtml } from './nav-html.model';
import { NavImage, NavImageWithExternalLink, NavImageWithInternalLink } from './nav-image.model';
import { NavInternalLink, NavExternalLink } from './nav-link.model';
import { NavMenu } from './nav-menu.model';
import { NavTitle, NavTitleWithExternalLink, NavTitleWithInternalLink } from './nav-title.model';

// eslint-disable-next-line jsdoc/require-jsdoc
export abstract class BaseNavElement {
    /**
     * The type of the element.
     */
    type!: 'title' | 'titleWithInternalLink' | 'titleWithExternalLink' |
        'image' | 'imageWithInternalLink' | 'imageWithExternalLink' |
        'internalLink' | 'button' | 'buttonFlat' | 'externalLink' | 'menu' | 'html';
    /**
     * The position of the element.
     */
    position?: 'left' | 'center' | 'right';
    /**
     * At which breakpoint the element should be moved inside the sidenav.
     */
    collapse?: 'lg' | 'md' | 'sm' | 'never' | 'always';
}

/**
 * One of the many NavElements.
 */
export type NavElement =
    NavTitle | NavTitleWithInternalLink | NavTitleWithExternalLink
    | NavImage | NavImageWithExternalLink | NavImageWithInternalLink
    | NavButton | NavInternalLink | NavExternalLink | NavMenu | NavHtml;