/* eslint-disable jsdoc/require-jsdoc */
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { NavElementTypes } from '../../../../models/nav-element.model';
import { NgxMatNavigationBaseNavElementComponent } from '../../base-nav-element.component';

@Component({
    // eslint-disable-next-line angular/component-selector
    selector: 'nav-internal-link',
    templateUrl: './nav-internal-link.component.html',
    styleUrls: ['./nav-internal-link.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FaIconComponent
    ]
})
export class NavInternalLinkComponent extends NgxMatNavigationBaseNavElementComponent<NavElementTypes.INTERNAL_LINK> {
    @Input({ required: true })
    isBreadcrumb!: boolean;

    get route(): string {
        if (typeof this.elementValue.route === 'string') {
            return this.elementValue.route;
        }
        return this.elementValue.route.path;
    }
}