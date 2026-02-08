import { Route } from '@angular/router';

import { NavButton } from './nav-button.model';
import { NavCustom } from './nav-custom.model';
import { NavImage, NavImageWithExternalLink, NavImageWithInternalLink } from './nav-image.model';
import { NavExternalLink, NavInternalLink } from './nav-link.model';
import { NavMenu } from './nav-menu.model';
import { NavRoute } from './nav-route.model';
import { NavText } from './nav-text.model';
import { NavTitle, NavTitleWithExternalLink, NavTitleWithInternalLink } from './nav-title.model';

/**
 * The three currently supported breakpoints.
 * These are the same as in bootstrap.
 */
export type ScreenWidthName = 'lg' | 'md' | 'sm';

/**
 * Type for the position of a nav element inside the navbar or footer.
 */
export type NavElementPosition = 'left' | 'center' | 'right';

/**
 * The type of the nav element. Eg. Title or button.
 */
export enum NavElementTypes {
    TITLE = 'title',
    TITLE_WITH_INTERNAL_LINK = 'titleWithInternalLink',
    TITLE_WITH_EXTERNAL_LINK = 'titleWithExternalLink',
    IMAGE = 'image',
    IMAGE_WITH_INTERNAL_LINK = 'imageWithInternalLink',
    IMAGE_WITH_EXTERNAL_LINK = 'imageWithExternalLink',
    INTERNAL_LINK = 'internalLink',
    BUTTON = 'button',
    BUTTON_FLAT = 'buttonFlat',
    EXTERNAL_LINK = 'externalLink',
    MENU = 'menu',
    CUSTOM = 'custom',
    TEXT = 'text'
}

/**
 * The abstract base class of any nav element.
 */
export abstract class BaseNavElement {
    /**
     * The id of the element.
     */
    id!: string;
    /**
     * The type of the element.
     */
    type!: NavElementTypes;
    /**
     * The position of the element.
     */
    position?: 'left' | 'center' | 'right';
    /**
     * At which breakpoint the element should be moved inside the sidenav.
     */
    collapse?: ScreenWidthName | 'never' | 'always';
    /**
     * A condition that must be met for the element to be displayed.
     */
    condition?: () => boolean;
    /**
     * The aria label of the element.
     */
    ariaLabel?: string;
}

/**
 * One of the many NavElements.
 */
export type NavElement<RouteType extends Route = NavRoute> = NavTitle
    | NavTitleWithInternalLink<RouteType> | NavTitleWithExternalLink
    | NavImage | NavImageWithExternalLink | NavImageWithInternalLink<RouteType>
    // eslint-disable-next-line typescript/no-explicit-any
    | NavButton | NavInternalLink<RouteType> | NavExternalLink | NavMenu | NavCustom<any> | NavText;