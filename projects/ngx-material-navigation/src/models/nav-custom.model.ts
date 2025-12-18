import { Type } from '@angular/core';

import { BaseNavElement, NavElementTypes } from './nav-element.model';
import { NgxMatNavigationBaseNavElementComponent } from '../components/nav-element/base-nav-element.component';

/**
 * Displays a custom element.
 */
export interface NavCustom<ComponentType extends NgxMatNavigationBaseNavElementComponent<NavElementTypes.CUSTOM>> extends BaseNavElement {
    /**
     * The type of the element.
     */
    type: NavElementTypes.CUSTOM,

    /**
     * The custom component.
     */
    component: Type<ComponentType>,

    /**
     * Whether or not the sidenav should be closed on click.
     */
    closeSidenavOnClick?: boolean,

    /**
     * Whether or not the menu should be closed on click.
     */
    closeMenuOnClick?: boolean
}