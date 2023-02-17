/* eslint-disable jsdoc/require-jsdoc */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavElementTypes } from '../../../../models/nav.model';
import { NgxMatNavigationBaseNavElementComponent } from '../../base-nav-element.component';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'nav-image',
    templateUrl: './nav-image.component.html',
    styleUrls: ['./nav-image.component.scss', '../base-nav-image.scss'],
    standalone: true,
    imports: [
        CommonModule
    ]
})
export class NavImageComponent extends NgxMatNavigationBaseNavElementComponent<NavElementTypes.IMAGE> { }