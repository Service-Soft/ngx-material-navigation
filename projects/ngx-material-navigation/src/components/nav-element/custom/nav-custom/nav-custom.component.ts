/* eslint-disable jsdoc/require-jsdoc */
import { CommonModule } from '@angular/common';
import { Component, ComponentRef, OnInit, Type, ViewContainerRef } from '@angular/core';
import { NavElementTypes } from '../../../../models/nav.model';
import { NgxMatNavigationBaseNavElementComponent } from '../../base-nav-element.component';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'nav-custom',
    templateUrl: './nav-custom.component.html',
    styleUrls: ['./nav-custom.component.scss'],
    standalone: true,
    imports: [
        CommonModule
    ]
})
export class NavCustomComponent<
    ComponentType extends NgxMatNavigationBaseNavElementComponent<NavElementTypes.CUSTOM>
> extends NgxMatNavigationBaseNavElementComponent<NavElementTypes.CUSTOM> implements OnInit {

    component!: ComponentRef<ComponentType>;

    constructor(private readonly viewContainerRef: ViewContainerRef) {
        super();
    }

    ngOnInit(): void {
        this.component = this.viewContainerRef.createComponent<ComponentType>(this.elementValue.component as Type<ComponentType>);
        this.component.instance.element = this.element;
        this.component.instance.isMenuItem = this.isMenuItem;
        this.component.instance.isSidenavElement = this.isSidenavElement;
    }
}