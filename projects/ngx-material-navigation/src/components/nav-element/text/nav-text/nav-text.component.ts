/* eslint-disable jsdoc/require-jsdoc */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavElementTypes } from '../../../../models/nav.model';
import { NgxMatNavigationBaseNavElementComponent } from '../../base-nav-element.component';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'nav-text',
    templateUrl: './nav-text.component.html',
    styleUrls: ['./nav-text.component.scss'],
    standalone: true,
    imports: [
        CommonModule
    ]
})
export class NavTextComponent extends NgxMatNavigationBaseNavElementComponent<NavElementTypes.TEXT> {}