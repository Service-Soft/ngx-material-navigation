import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterContentChecked, Component, ElementRef, HostListener, Inject, InjectionToken, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';

import { NavElement, NavElementTypes } from '../../models/nav.model';
import { NavbarRow } from '../../models/navbar.model';
import { NgxMatNavigationService } from '../../services/nav.service';
import { NavElementComponent } from '../nav-element/nav-element.component';

// eslint-disable-next-line jsdoc/require-jsdoc
export const NGX_BURGER_MENU_ARIA_LABEL: InjectionToken<string> = new InjectionToken<string>(
    'Provider for the burger menu aria label. Default: "Open Sidenav"',
    {
        providedIn: 'root',
        factory: () => 'Open Sidenav'
    }
);

// eslint-disable-next-line jsdoc/require-jsdoc
export const NGX_BURGER_MENU_ICON: InjectionToken<string> = new InjectionToken<string>(
    'Provider for the burger menu icon. Default: "fas fa-bars"',
    {
        providedIn: 'root',
        factory: () => 'fas fa-bars'
    }
);

/**
 * The navbar component.
 * Takes in your configuration and builds a toolbar as well as a sidenav accordingly.
 * Also handles responsiveness.
 */
@Component({
    selector: 'ngx-mat-navigation-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatToolbarModule,
        NavElementComponent,
        MatSidenavModule
    ]
})
export class NgxMatNavigationNavbarComponent implements OnInit, OnDestroy, AfterContentChecked {
    private readonly onDestroy: Subject<void> = new Subject();

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

    // eslint-disable-next-line jsdoc/require-jsdoc
    @ViewChild('sidenav')
    sidenav?: MatSidenav;

    // eslint-disable-next-line jsdoc/require-jsdoc
    @ViewChild('navbar', { read: ElementRef })
    navbar?: ElementRef<HTMLElement>;

    // eslint-disable-next-line jsdoc/require-jsdoc
    burgerMenu!: NavElement;

    /**
     * The minimum height of the navbar in sanitized.
     */
    sanitizedMinHeight!: SafeStyle;

    // eslint-disable-next-line jsdoc/require-jsdoc
    screenWidthName!: 'lg' | 'md' | 'sm';

    // eslint-disable-next-line jsdoc/require-jsdoc
    internalSidenavElements: NavElement[] = [];

    constructor(
        private readonly sanitizer: DomSanitizer,
        public navService: NgxMatNavigationService,
        @Inject(NGX_BURGER_MENU_ICON)
        private readonly burgerMenuIcon: string,
        @Inject(NGX_BURGER_MENU_ARIA_LABEL)
        private readonly burgerMenuAriaLabel: string,
        @Inject(PLATFORM_ID)
        private readonly platformId: Object
    ) {
        this.burgerMenu = {
            type: NavElementTypes.BUTTON_FLAT,
            name: '',
            icon: this.burgerMenuIcon,
            action: () => this.sidenav?.toggle(),
            collapse: 'never',
            ariaLabel: this.burgerMenuAriaLabel
        };
    }

    ngOnInit(): void {
        this.screenWidthName = this.getCurrentScreenWidthName();
        this.navService.navbarRowsSubject.pipe(takeUntil(this.onDestroy)).subscribe(navbarRows => {
            this.internalSidenavElements = this.navService.getSidenavElements(navbarRows, this.screenWidthName);
            if (!this.internalSidenavElements.length && (this.sidenav?.opened === true)) {
                void this.sidenav.close();
            }
        });
        this.navService.navbarRowsSubject.next(this.navbarRows);
        this.navService.anchorsSubject.pipe(takeUntil(this.onDestroy)).subscribe(() => {
            this.navService.navbarRowsSubject.next(this.navService.navbarRowsSubject.value);
        });
    }

    ngAfterContentChecked(): void {
        this.updateHeights();
    }

    ngOnDestroy(): void {
        this.onDestroy.next(undefined);
        this.onDestroy.complete();
    }

    private updateHeights(): void {
        if (this.minHeight && typeof this.minHeight !== 'number') {
            throw new Error('Incorrect input data');
        }
        if (this.minHeightOtherElements && typeof this.minHeightOtherElements !== 'number') {
            throw new Error('Incorrect input data');
        }
        if (!this.navbar) {
            return;
        }
        if (!this.minHeight || (this.navbar.nativeElement.offsetHeight > this.minHeight)) {
            this.sanitizedMinHeight = this.sanitizer.bypassSecurityTrustStyle(
                `calc(100vh - ${this.navbar.nativeElement.offsetHeight + (this.minHeightOtherElements ?? 0)}px)`
            );
            return;
        }
        this.sanitizedMinHeight = this.sanitizer.bypassSecurityTrustStyle(
            `calc(100vh - ${(this.minHeight ?? 0) + (this.minHeightOtherElements ?? 0)}px)`
        );
    }

    /**
     * Updates the current screen width and filters the sidenav elements accordingly.
     * @throws When no height data is provided or the data is invalid.
     */
    @HostListener('window:resize', ['$event'])
    onResize(): void {
        this.updateHeights();
        this.screenWidthName = this.getCurrentScreenWidthName();
        this.navService.navbarRowsSubject.next(this.navService.navbarRowsSubject.value);
    }

    private getCurrentScreenWidthName(): 'lg' | 'md' | 'sm' {
        if (!isPlatformBrowser(this.platformId)) {
            return 'lg';
        }
        if (window.innerWidth < 768) {
            return 'sm';
        }
        else if (window.innerWidth < 992) {
            return 'md';
        }
        else {
            return 'lg';
        }
    }

    /**
     * Defines if the sidenav should be closed when the given element is clicked.
     * @param element - The element that has been clicked.
     */
    clickSidenavElement(element: NavElement): void {
        switch (element.type) {
            case NavElementTypes.TITLE:
            case NavElementTypes.IMAGE:
            case NavElementTypes.MENU:
            case NavElementTypes.CUSTOM:
                return;
            default:
                void this.sidenav?.close();
        }
    }
}