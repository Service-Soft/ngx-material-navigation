import { Type } from '@angular/core';
import { NgxMatNavigationBaseNavElementComponent } from '../components/nav-element/base-nav-element.component';
import { BaseNavElement, NavElementTypes } from './nav.model';

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
    component: Type<ComponentType>
}