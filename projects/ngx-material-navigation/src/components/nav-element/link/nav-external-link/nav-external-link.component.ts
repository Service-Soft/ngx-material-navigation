/* eslint-disable jsdoc/require-jsdoc */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NavElementTypes } from '../../../../models/nav.model';
import { NgxMatNavigationBaseNavElementComponent } from '../../base-nav-element.component';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'nav-external-link',
    templateUrl: './nav-external-link.component.html',
    styleUrls: ['./nav-external-link.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule
    ]
})
export class NavExternalLinkComponent extends NgxMatNavigationBaseNavElementComponent<NavElementTypes.EXTERNAL_LINK> { }