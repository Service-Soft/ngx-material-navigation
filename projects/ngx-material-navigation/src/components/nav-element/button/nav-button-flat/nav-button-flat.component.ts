/* eslint-disable jsdoc/require-jsdoc */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NavButtonComponent } from '../nav-button/nav-button.component';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'nav-button-flat',
    templateUrl: './nav-button-flat.component.html',
    styleUrls: ['./nav-button-flat.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule
    ]
})
export class NavButtonFlatComponent extends NavButtonComponent {}