/* eslint-disable jsdoc/require-jsdoc */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { NavElementTypes } from '../../../../models/nav-element.model';
import { NgxMatNavigationBaseNavElementComponent } from '../../base-nav-element.component';

@Component({
    // eslint-disable-next-line angular/component-selector
    selector: 'nav-title-with-external-link',
    templateUrl: './nav-title-with-external-link.component.html',
    styleUrls: ['../base-nav-title.scss'],
    standalone: true,
    imports: [CommonModule, FaIconComponent]
})
export class NavTitleWithExternalLinkComponent extends NgxMatNavigationBaseNavElementComponent<NavElementTypes.TITLE_WITH_EXTERNAL_LINK> { }