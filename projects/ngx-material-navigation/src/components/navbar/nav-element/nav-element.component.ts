import { AfterContentChecked, Component, HostListener, Input, ViewChild } from '@angular/core';
import { NavElement } from '../../../models/nav.model';
import { NavUtilities } from '../../../utilities/nav.utilities';
import { MatSidenav } from '@angular/material/sidenav';
import { MatButton } from '@angular/material/button';

/**
 * Displays a single Navigation Element.
 */
@Component({
    selector: 'ngx-mat-navigation-element',
    templateUrl: './nav-element.component.html',
    styleUrls: ['./nav-element.component.scss']
})
export class NavElementComponent implements AfterContentChecked {

    NavUtilities = NavUtilities;

    /**
     * The element to display.
     */
    @Input()
    element!: NavElement;

    /**
     * A reference to the sidenav. Is needed for the menu to close the sidenav.
     */
    @Input()
    sidenav?: MatSidenav;

    /**
     * Whether or not this element should be displayed inside the sidenav.
     * Used to apply different styling.
     */
    @Input()
    sidenavElement?: boolean;

    @ViewChild('menuButton')
    menuButton!: MatButton;

    menuWidth!: number;

    ngAfterContentChecked(): void {
        if (this.menuButton) {
            this.menuWidth = this.getMenuWidth();
        }
    }

    /**
     * Updates the width of the menu to the value of its button.
     */
    @HostListener('window:resize', ['$event'])
    onResize(): void {
        if (this.menuButton) {
            this.menuWidth = this.getMenuWidth();
        }
    }

    private getMenuWidth(): number {
        return (this.menuButton._elementRef.nativeElement as HTMLElement).offsetWidth;
    }
}