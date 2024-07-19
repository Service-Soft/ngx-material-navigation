import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, Input, runInInjectionContext } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FooterRow, NavFooterElement } from '../../models/footer.model';
import { NavElement, NavElementPosition } from '../../models/nav-element.model';
import { NavElementComponent } from '../nav-element/nav-element.component';

/**
 * Displays a footer based on the provided input data.
 */
@Component({
    selector: 'ngx-mat-navigation-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatToolbarModule,
        NavElementComponent
    ]
})
export class NgxMatNavigationFooterComponent {

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

    constructor(private readonly injector: EnvironmentInjector) {}

    /**
     * Gets the footer elements for the given row at the provided position.
     * @param row - The row to get the elements for.
     * @param position - Where in the footer the elements are positioned.
     * @returns An array of the resolved footer elements.
     */
    getFooterElements(row: FooterRow, position: NavElementPosition): NavFooterElement[] {
        let res: NavFooterElement[] = [];
        res = res.concat(row.elements);
        res = res.filter(e => this.checkCondition(e));

        if (position === 'left') {
            return res.filter(e => e.position == undefined || e.position === position);
        }
        return res.filter(e => e.position === position);
    }

    private checkCondition(element: NavElement): boolean {
        if (element.condition == undefined) {
            return true;
        }
        // runInInjectionContext(...) is needed to enable the user to use injections in his condition functions.
        return runInInjectionContext(this.injector, () => element.condition ? element.condition() : true);
    }
}