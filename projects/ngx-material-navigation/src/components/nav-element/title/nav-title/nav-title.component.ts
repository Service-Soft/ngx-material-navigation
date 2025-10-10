import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { NavElementTypes } from '../../../../models/nav-element.model';
import { NgxMatNavigationBaseNavElementComponent } from '../../base-nav-element.component';

@Component({
    // eslint-disable-next-line angular/component-selector
    selector: 'nav-title',
    templateUrl: './nav-title.component.html',
    styleUrls: ['../base-nav-title.scss'],
    standalone: true,
    imports: [CommonModule, FaIconComponent]
})
// eslint-disable-next-line jsdoc/require-jsdoc
export class NavTitleComponent extends NgxMatNavigationBaseNavElementComponent<NavElementTypes.TITLE> { }