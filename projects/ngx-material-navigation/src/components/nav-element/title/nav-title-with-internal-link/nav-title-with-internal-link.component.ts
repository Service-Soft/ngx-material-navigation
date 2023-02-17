/* eslint-disable jsdoc/require-jsdoc */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavElementTypes } from '../../../../models/nav.model';
import { NgxMatNavigationBaseNavElementComponent } from '../../base-nav-element.component';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'nav-title-with-internal-link',
    templateUrl: './nav-title-with-internal-link.component.html',
    styleUrls: ['./nav-title-with-internal-link.component.scss', '../base-nav-title.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class NavTitleWithInternalLinkComponent extends NgxMatNavigationBaseNavElementComponent<NavElementTypes.TITLE_WITH_INTERNAL_LINK> {
    get route(): string {
        if (typeof this.elementValue.link.route === 'string') {
            return this.elementValue.link.route;
        }
        return this.elementValue.link.route.path;
    }
}