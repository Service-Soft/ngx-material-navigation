import { Component, Input } from '@angular/core';

/**
 * Displays a footer based on the provided input data.
 */
@Component({
    selector: 'ngx-mat-navigation-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    /**
     * The minimum height of the footer.
     */
    @Input()
    minHeight!: number;

    constructor() { }
}