import { AfterContentChecked, Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';
import { NavElement, NavElementTypes } from '../../models/nav.model';
import { NavUtilities } from '../../utilities/nav.utilities';

/**
 * Displays a single Navigation Element.
 */
@Component({
    selector: 'ngx-mat-navigation-element',
    templateUrl: './nav-element.component.html',
    styleUrls: ['./nav-element.component.scss']
})
export class NavElementComponent implements AfterContentChecked, OnInit {

    // eslint-disable-next-line @typescript-eslint/typedef
    NavUtilities = NavUtilities;
    NavElementTypes: typeof NavElementTypes = NavElementTypes;

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
    isSidenavElement?: boolean;
    protected internalIsSidenavElement!: boolean;

    /**
     * Whether or not this element should be displayed inside a menu.
     * Used to apply different styling.
     */
    @Input()
    isMenuItem?: boolean;
    protected internalIsMenuItem!: boolean;

    @ViewChild('menuButton')
    menuButton?: MatButton;

    menuWidth!: number;

    ngOnInit(): void {
        this.internalIsSidenavElement = this.isSidenavElement ?? false;
        this.internalIsMenuItem = this.isMenuItem ?? false;
    }

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
        return (this.menuButton?._elementRef.nativeElement as HTMLElement).offsetWidth;
    }

    /**
     * Defines if the sidenav should be closed when the given element is clicked.
     *
     * @param element - The element that has been clicked.
     */
    clickSidenavElement(element: NavElement): void {
        switch (element.type) {
            case NavElementTypes.TITLE:
            case NavElementTypes.IMAGE:
            case NavElementTypes.MENU:
            case NavElementTypes.HTML:
                return;
            default:
                void this.sidenav?.close();
        }
    }
}