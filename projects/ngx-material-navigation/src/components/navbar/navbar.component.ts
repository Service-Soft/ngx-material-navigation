import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { NavElement } from '../../models/nav.model';
import { NavbarRow } from '../../models/navbar.model';
import { NavUtilities } from '../../utilities/nav.utilities';

/**
 * The navbar component.
 * Takes in your configuration and builds a toolbar as well as a sidenav accordingly.
 * Also handles responsiveness.
 */
@Component({
    selector: 'ngx-mat-navigation-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    NavUtilities = NavUtilities;

    /**
     * The navbar rows to build the navbar from.
     */
    @Input()
    navbarRows!: NavbarRow[];

    /**
     * The minimum height of the navbar.
     */
    @Input()
    minHeight!: number;

    /**
     * The minimum height of all other elements that are on the same level as the navbar component.
     */
    @Input()
    minHeightOtherElements!: number;

    /**
     * The minimum width of the sidenav.
     */
    @Input()
    minSidenavWidth?: string;

    @ViewChild('sidenav')
    sidenav!: MatSidenav;

    sidenavElements: NavElement[] = [];

    burgerMenu: NavElement = {
        type: 'button',
        name: '',
        icon: 'fas fa-bars',
        action: () => this.sidenav.toggle(),
        collapse: 'never'
    };

    sanitizedMinHeight!: SafeStyle;

    screenWidth!: number;
    screenWidthName!: 'lg' | 'md' | 'sm';

    constructor(public sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        if (
            !this.minHeight || typeof this.minHeight !== 'number'
            || !this.minHeightOtherElements || typeof this.minHeightOtherElements !== 'number'
        ) {
            throw new Error('Incorrect input data');
        }
        else {
            this.sanitizedMinHeight = this.sanitizer.bypassSecurityTrustStyle(
                `calc(100vh - ${this.minHeight + this.minHeightOtherElements}px)`
            );
            this.screenWidth = window.innerWidth;
            this.screenWidthName = this.getCurrentScreenWidth();
            this.sidenavElements = NavUtilities.getSidenavElements(this.screenWidthName, this.navbarRows);
        }
    }

    /**
     * Updates the current screen width and filters the sidenav elements accordingly.
     */
    @HostListener('window:resize', ['$event'])
    onResize(): void {
        this.screenWidth = window.innerWidth;
        this.screenWidthName = this.getCurrentScreenWidth();
        this.sidenavElements = NavUtilities.getSidenavElements(this.screenWidthName, this.navbarRows);
        if (!this.sidenavElements.length && this.sidenav.opened) {
            this.sidenav.close();
        }
    }

    /**
     * Defines if the sidenav should be closed when the given element is clicked.
     *
     * @param element - The element that has been clicked.
     */
    clickSidenavElement(element: NavElement): void {
        switch (element.type) {
            case 'image':
            case 'title':
            case 'menu':
                return;
            default:
                this.sidenav.close();
        }
    }

    private getCurrentScreenWidth(): 'lg' | 'md' | 'sm' {
        if (this.screenWidth < 768) {
            return 'sm';
        }
        else if (this.screenWidth < 992) {
            return 'md';
        }
        else {
            return 'lg';
        }
    }
}