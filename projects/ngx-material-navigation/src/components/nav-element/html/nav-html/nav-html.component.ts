/* eslint-disable jsdoc/require-jsdoc */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavElementTypes } from '../../../../models/nav.model';
import { PurifyUtilities } from '../../../../utilities/purify.utilities';
import { NgxMatNavigationBaseNavElementComponent } from '../../base-nav-element.component';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'nav-html',
    templateUrl: './nav-html.component.html',
    styleUrls: ['./nav-html.component.scss'],
    standalone: true,
    imports: [
        CommonModule
    ]
})
export class NavHtmlComponent extends NgxMatNavigationBaseNavElementComponent<NavElementTypes.HTML> {

    constructor(private readonly sanitizer: DomSanitizer) {
        super();
    }

    get sanitizedHtml(): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(PurifyUtilities.sanitize(this.elementValue.html));
    }
}