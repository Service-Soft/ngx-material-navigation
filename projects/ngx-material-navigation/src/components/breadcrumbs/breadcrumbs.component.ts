import { Component } from '@angular/core';
import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { NavElementTypes } from '../../models/nav-element.model';
import { NgxMatNavigationService } from '../../services/nav.service';
import { NavInternalLinkComponent } from '../nav-element/link/nav-internal-link/nav-internal-link.component';

/**
 * The breadcrumbs component.
 * Is built dynamically from the data of the current route.
 */
@Component({
    selector: 'ngx-mat-navigation-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss'],
    standalone: true,
    imports: [NavInternalLinkComponent, FaIconComponent]
})
export class NgxMatNavigationBreadcrumbsComponent {
    // eslint-disable-next-line jsdoc/require-jsdoc
    readonly NavElementTypes: typeof NavElementTypes = NavElementTypes;

    // eslint-disable-next-line jsdoc/require-jsdoc
    readonly separator: IconDefinition = faChevronRight;

    constructor(readonly navService: NgxMatNavigationService) {}
}