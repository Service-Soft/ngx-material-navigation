/* eslint-disable jsdoc/require-jsdoc */
import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NavElementTypes } from '../../../../models/nav.model';
import { NgxMatNavigationBaseNavElementComponent } from '../../base-nav-element.component';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'nav-button',
    templateUrl: './nav-button.component.html',
    styleUrls: ['./nav-button.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule
    ]
})
export class NavButtonComponent extends NgxMatNavigationBaseNavElementComponent<NavElementTypes.BUTTON> {

    constructor(private readonly injector: EnvironmentInjector) {
        super();
    }

    /**
     * Runs the action of the element.
     * This wrapper is needed to enable the user to use injections in his action functions.
     */
    runAction(): void {
        this.injector.runInContext(() => this.elementValue.action());
    }
}