/* eslint-disable jsdoc/require-jsdoc */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { NavElementTypes } from '../../../../models/nav.model';
import { NgxMatNavigationBaseNavElementComponent } from '../../base-nav-element.component';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'nav-internal-link',
    templateUrl: './nav-internal-link.component.html',
    styleUrls: ['./nav-internal-link.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        RouterModule
    ]
})
export class NavInternalLinkComponent extends NgxMatNavigationBaseNavElementComponent<NavElementTypes.INTERNAL_LINK> {
    get route(): string {
        if (typeof this.elementValue.route === 'string') {
            return this.elementValue.route;
        }
        return this.elementValue.route.path;
    }
}