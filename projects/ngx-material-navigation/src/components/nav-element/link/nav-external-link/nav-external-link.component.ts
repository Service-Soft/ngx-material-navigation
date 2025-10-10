/* eslint-disable jsdoc/require-jsdoc */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { NavElementTypes } from '../../../../models/nav-element.model';
import { NgxMatNavigationBaseNavElementComponent } from '../../base-nav-element.component';

@Component({
    // eslint-disable-next-line angular/component-selector
    selector: 'nav-external-link',
    templateUrl: './nav-external-link.component.html',
    styleUrls: ['./nav-external-link.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FaIconComponent
    ]
})
export class NavExternalLinkComponent extends NgxMatNavigationBaseNavElementComponent<NavElementTypes.EXTERNAL_LINK> { }