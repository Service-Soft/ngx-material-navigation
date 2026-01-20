import { ActivatedRouteSnapshot, Data, ResolveFn, Route, RouterStateSnapshot } from '@angular/router';
import { IconDefinition } from '@fortawesome/angular-fontawesome';

import { PageNotFoundConfig } from './page-not-found-config.model';

/**
 * An opinionated model of the Angular Route.
 * This makes the title and path attributes required.
 * It also adds the option to use a generic for the route data.
 */
export interface NavRoute<DataType extends Data = DefaultNavRouteDataType> extends Route {
    // eslint-disable-next-line jsdoc/require-jsdoc
    title: string | ResolveFn<string>,
    // eslint-disable-next-line jsdoc/require-jsdoc
    path: string,
    // eslint-disable-next-line jsdoc/require-jsdoc
    data?: DataType
}

/**
 * The default data type for a nav route.
 * Will be used if no generic is provided.
 */
export interface DefaultNavRouteDataType extends Data {
    /**
     * The configuration for the 404 page not found component.
     */
    pageNotFoundConfig?: PageNotFoundConfig,
    /**
     * Any anchors that might be on this specific route.
     */
    anchors?: NavAnchor[],
    /**
     * Configuration for the breadcrumb.
     */
    breadcrumbConfig?: {
        /**
         * The name of the breadcrumb.
         */
        name?: string | ((snapshot: ActivatedRouteSnapshot, stateSnapshot: RouterStateSnapshot) => string),
        /**
         * An optional icon used in the breadcrumb.
         */
        icon?: IconDefinition,
        /**
         * An optional aria label used in the breadcrumb.
         */
        ariaLabel?: string,
        /**
         * The route of the parent of this route.
         */
        parentRoute?: string
    }
}

/**
 * The data for an nav anchor element.
 */
export interface NavAnchor {
    /**
     * The name to display inside the navbar.
     */
    name: string,
    /**
     * The fragment anchor id.
     */
    fragment: string,
    /**
     * An optional icon for the anchor.
     */
    icon?: IconDefinition,
    /**
     * The aria label of the element.
     */
    ariaLabel?: string
}