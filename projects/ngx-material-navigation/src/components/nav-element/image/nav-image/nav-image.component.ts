/* eslint-disable jsdoc/require-jsdoc */
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

import { NavElementTypes } from '../../../../models/nav-element.model';
import { NgxMatNavigationBaseNavElementComponent } from '../../base-nav-element.component';

@Component({
    // eslint-disable-next-line angular/component-selector
    selector: 'nav-image',
    templateUrl: './nav-image.component.html',
    styleUrls: ['../base-nav-image.scss'],
    standalone: true,
    imports: [CommonModule, NgOptimizedImage]
})
export class NavImageComponent extends NgxMatNavigationBaseNavElementComponent<NavElementTypes.IMAGE> { }