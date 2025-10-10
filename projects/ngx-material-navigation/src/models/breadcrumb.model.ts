import { IconDefinition } from '@fortawesome/angular-fontawesome';

/**
 * Definition of a breadcrumb.
 */
export type Breadcrumb = {
    /**
     * The name of the breadcrumb.
     */
    name: string,
    /**
     * The route of the breadcrumb.
     */
    route: string,
    /**
     * An optional icon for the breadcrumb.
     */
    icon?: IconDefinition,
    /**
     * The aria label of the breadcrumb.
     */
    ariaLabel?: string
};