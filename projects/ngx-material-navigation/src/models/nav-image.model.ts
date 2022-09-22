import { Route } from '@angular/router';
import { NavExternalLink, NavInternalLink } from './nav-link.model';
import { NavRoute } from './nav-route.model';
import { BaseNavElement } from './nav.model';

/**
 * The definition for an image.
 */
export interface NavImage extends BaseNavElement {
    // eslint-disable-next-line jsdoc/require-jsdoc
    type: 'image',
    /**
     * The url of the image file.
     */
    url: string
}

/**
 * The definition for an image with an internal link.
 */
export interface NavImageWithInternalLink<RouteType extends Route = NavRoute> extends BaseNavElement {
    // eslint-disable-next-line jsdoc/require-jsdoc
    type: 'imageWithInternalLink',
    /**
     * The url of the image file.
     */
    url: string,
    /**
     * The link object. Contains the route and whether or not it should be opened in a new tab.
     */
    link: Omit<NavInternalLink<RouteType>, 'name' | 'icon' | 'type' | 'collapse' | 'position'>
}

/**
 * The definition for an image with an external link.
 */
export interface NavImageWithExternalLink extends BaseNavElement {
    // eslint-disable-next-line jsdoc/require-jsdoc
    type: 'imageWithExternalLink',
    /**
     * The url of the image file.
     */
    url: string,
    /**
     * The link object. Contains the href link and whether or not it should be opened in a new tab.
     */
    link: Omit<NavExternalLink, 'name' | 'icon' | 'type' | 'collapse' | 'position'>
}