import { Component, Input } from '@angular/core';
import { FooterRow } from '../../models/footer.model';
import { NavUtilities } from '../../utilities/nav.utilities';

/**
 * Displays a footer based on the provided input data.
 */
@Component({
    selector: 'ngx-mat-navigation-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class NgxMatNavigationFooterComponent {

    NavUtilities = NavUtilities;

    /**
     * The minimum height of the footer.
     */
    @Input()
    minHeight!: number;

    /**
     * The footer rows to build the footer from.
     */
    @Input()
    footerRows!: FooterRow[];
}