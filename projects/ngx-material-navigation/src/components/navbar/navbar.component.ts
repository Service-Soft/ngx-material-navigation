import { AfterContentChecked, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
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
export class NgxMatNavigationNavbarComponent implements OnInit, AfterContentChecked {

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
    minHeight?: number;

    /**
     * The minimum height of all other elements that are on the same level as the navbar component.
     */
    @Input()
    minHeightOtherElements?: number;

    /**
     * The minimum width of the sidenav.
     */
    @Input()
    minSidenavWidth?: string;

    @ViewChild('sidenav')
    sidenav!: MatSidenav;

    @ViewChild('navbar', { read: ElementRef })
    navbar!: ElementRef<HTMLElement>;

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

    constructor(private readonly sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        this.screenWidth = window.innerWidth;
        this.screenWidthName = this.getCurrentScreenWidth();
        this.sidenavElements = NavUtilities.getSidenavElements(this.screenWidthName, this.navbarRows);
    }

    ngAfterContentChecked(): void {
        this.updateHeights();
    }

    private updateHeights(): void {
        if (
            (this.minHeight && typeof this.minHeight !== 'number')
            || (this.minHeightOtherElements && typeof this.minHeightOtherElements !== 'number')
        ) {
            throw new Error('Incorrect input data');
        }
        else if (this.navbar) {
            if (!this.minHeight || this.navbar.nativeElement.offsetHeight > this.minHeight) {
                this.sanitizedMinHeight = this.sanitizer.bypassSecurityTrustStyle(
                    // eslint-disable-next-line max-len
                    `calc(100vh - ${this.navbar.nativeElement.offsetHeight + (this.minHeightOtherElements ? this.minHeightOtherElements : 0)}px)`
                );
            }
            else {
                this.sanitizedMinHeight = this.sanitizer.bypassSecurityTrustStyle(
                    // eslint-disable-next-line max-len
                    `calc(100vh - ${(this.minHeight ? this.minHeight : 0) + (this.minHeightOtherElements ? this.minHeightOtherElements : 0)}px)`
                );
            }
        }
    }

    /**
     * Updates the current screen width and filters the sidenav elements accordingly.
     *
     * @throws When no height data is provided or the data is invalid.
     */
    @HostListener('window:resize', ['$event'])
    onResize(): void {
        this.updateHeights();
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
            case 'html':
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