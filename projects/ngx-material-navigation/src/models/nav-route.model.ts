import { Type } from '@angular/core';
import { Data, Resolve, ResolveFn, Route } from '@angular/router';
import { PageNotFoundConfig } from './page-not-found-config.model';

/**
 * An opinionated model of the Angular Route.
 * This makes the title and path attributes required.
 * It also adds the option to use a generic for the route data.
 */
export interface NavRoute<DataType extends Data = DefaultNavRouteDataType> extends Route {
    // eslint-disable-next-line jsdoc/require-jsdoc
    title: string | Type<Resolve<string>> | ResolveFn<string>,
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
    pageNotFoundConfig?: PageNotFoundConfig
}