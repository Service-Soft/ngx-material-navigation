/* eslint-disable jsdoc/require-jsdoc */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavElementTypes } from '../../../../models/nav.model';
import { NgxMatNavigationBaseNavElementComponent } from '../../base-nav-element.component';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'nav-title-with-external-link',
    templateUrl: './nav-title-with-external-link.component.html',
    styleUrls: ['./nav-title-with-external-link.component.scss', '../base-nav-title.scss'],
    standalone: true,
    imports: [
        CommonModule
    ]
})
export class NavTitleWithExternalLinkComponent extends NgxMatNavigationBaseNavElementComponent<NavElementTypes.TITLE_WITH_EXTERNAL_LINK> { }