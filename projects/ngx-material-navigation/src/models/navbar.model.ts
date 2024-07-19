import { Route } from '@angular/router';

import { NavElement } from './nav-element.model';
import { NavRoute } from './nav-route.model';

/**
 * A row with multiple elements.
 * Used to display a single mat-toolbar row.
 */
export interface NavbarRow<RouteType extends Route = NavRoute> {
    /**
     * The elements inside the row.
     */
    elements: NavElement<RouteType>[]
}