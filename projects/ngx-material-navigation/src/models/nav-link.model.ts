import { Route } from '@angular/router';
import { IconDefinition } from '@fortawesome/angular-fontawesome';

import { BaseNavElement, NavElementTypes } from './nav-element.model';
import { NavRoute } from './nav-route.model';

/**
 * The base abstract definition for internal and external links.
 */
export abstract class NavLink extends BaseNavElement {
    /**
     * The name to display for the link.
     */
    name!: string;
    /**
     * An icon to display left of the link.
     */
    icon?: IconDefinition;
    /**
     * Whether or not the link should be opened in a new tab.
     */
    openInNewTab?: boolean;
}

/**
 * The definition for an internal route.
 */
export interface NavInternalLink<RouteType extends Route = NavRoute> extends NavLink {
    // eslint-disable-next-line jsdoc/require-jsdoc
    type: NavElementTypes.INTERNAL_LINK,
    /**
     * The route of the Link. Can be either an angular route or a simple string.
     */
    route: RouteType | string,
    /**
     * The fragment of the route used for anchor scrolling.
     */
    fragment?: string
}

/**
 * The definition for an external link.
 */
export interface NavExternalLink extends NavLink {
    // eslint-disable-next-line jsdoc/require-jsdoc
    type: NavElementTypes.EXTERNAL_LINK,
    /**
     * The url of the link.
     */
    url: string
}