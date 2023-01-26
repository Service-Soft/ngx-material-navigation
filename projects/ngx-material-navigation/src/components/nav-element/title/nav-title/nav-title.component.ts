/* eslint-disable jsdoc/require-jsdoc */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavElementTypes } from '../../../../models/nav.model';
import { NgxMatNavigationBaseNavElementComponent } from '../../base-nav-element.component';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'nav-title',
    templateUrl: './nav-title.component.html',
    styleUrls: ['./nav-title.component.scss', '../base-nav-title.scss'],
    standalone: true,
    imports: [
        CommonModule
    ]
})
export class NavTitleComponent extends NgxMatNavigationBaseNavElementComponent<NavElementTypes.TITLE> { }