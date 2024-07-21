import { Route } from '@angular/router';
import { IconDefinition } from '@fortawesome/angular-fontawesome';

import { BaseNavElement, NavElementTypes } from './nav-element.model';
import { NavExternalLink, NavInternalLink } from './nav-link.model';
import { NavRoute } from './nav-route.model';

/**
 * A h1 Title.
 */
export interface NavTitle extends BaseNavElement {
    // eslint-disable-next-line jsdoc/require-jsdoc
    type: NavElementTypes.TITLE,
    /**
     * The text to display inside the h1 tag.
     */
    title: string,
    /**
     * An icon to display left of the title.
     */
    icon?: IconDefinition
}

/**
 * A h1 title that links to an internal angular route.
 */
export interface NavTitleWithInternalLink<RouteType extends Route = NavRoute> extends BaseNavElement {
    // eslint-disable-next-line jsdoc/require-jsdoc
    type: NavElementTypes.TITLE_WITH_INTERNAL_LINK,
    /**
     * The text to display inside the h1 tag.
     */
    title: string,
    /**
     * An icon to display left of the title.
     */
    icon?: IconDefinition,
    /**
     * The link object. Contains the route and whether or not it should be opened in a new tab.
     */
    link: Omit<NavInternalLink<RouteType>, 'name' | 'icon' | 'type' | 'collapse' | 'position'>
}

/**
 * A h1 title that links to an external page.
 */
export interface NavTitleWithExternalLink extends BaseNavElement {
    // eslint-disable-next-line jsdoc/require-jsdoc
    type: NavElementTypes.TITLE_WITH_EXTERNAL_LINK,
    /**
     * The text to display inside the h1 tag.
     */
    title: string,
    /**
     * An icon to display left of the title.
     */
    icon?: IconDefinition,
    /**
     * The link object. Contains the href link and whether or not it should be opened in a new tab.
     */
    link: Omit<NavExternalLink, 'name' | 'icon' | 'type' | 'collapse' | 'position'>
}