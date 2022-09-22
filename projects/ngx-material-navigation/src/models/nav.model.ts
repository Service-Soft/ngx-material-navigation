import { Route } from '@angular/router';
import { NavButton } from './nav-button.model';
import { NavHtml } from './nav-html.model';
import { NavImage, NavImageWithExternalLink, NavImageWithInternalLink } from './nav-image.model';
import { NavInternalLink, NavExternalLink } from './nav-link.model';
import { NavMenu } from './nav-menu.model';
import { NavRoute } from './nav-route.model';
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
    /**
     * A condition that must be met for the element to be displayed.
     */
    condition?: () => boolean;
}

/**
 * One of the many NavElements.
 */
export type NavElement<RouteType extends Route = NavRoute> =
    NavTitle | NavTitleWithInternalLink<RouteType> | NavTitleWithExternalLink
    | NavImage | NavImageWithExternalLink | NavImageWithInternalLink<RouteType>
    | NavButton | NavInternalLink<RouteType> | NavExternalLink | NavMenu | NavHtml;