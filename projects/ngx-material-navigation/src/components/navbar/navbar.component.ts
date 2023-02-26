import { AfterContentChecked, Component, ElementRef, HostListener, Inject, InjectionToken, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { NavElement, NavElementTypes } from '../../models/nav.model';
import { NavbarRow } from '../../models/navbar.model';
import { NgxMatNavigationService } from '../../services/nav.service';

export const NGX_BURGER_MENU_ARIA_LABEL: InjectionToken<string> = new InjectionToken<string>(
    'Provider for the burger menu aria label. Default: "Open Sidenav"',
    {
        providedIn: 'root',
        factory: () => 'Open Sidenav'
    }
);

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
    styleUrls: ['./navbar.component.scss']
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

    @ViewChild('sidenav')
    sidenav?: MatSidenav;

    @ViewChild('navbar', { read: ElementRef })
    navbar?: ElementRef<HTMLElement>;

    burgerMenu!: NavElement;

    sanitizedMinHeight!: SafeStyle;

    screenWidthName: 'lg' | 'md' | 'sm' = this.getCurrentScreenWidthName();

    internalSidenavElements: NavElement[] = [];

    constructor(
        private readonly sanitizer: DomSanitizer,
        public navService: NgxMatNavigationService,
        @Inject(NGX_BURGER_MENU_ICON)
        private readonly burgerMenuIcon: string,
        @Inject(NGX_BURGER_MENU_ARIA_LABEL)
        private readonly burgerMenuAriaLabel: string
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
        this.navService.navbarRowsSubject.pipe(takeUntil(this.onDestroy)).subscribe(navbarRows => {
            this.internalSidenavElements = this.navService.getSidenavElements(navbarRows, this.screenWidthName);
            if (!this.internalSidenavElements.length && this.sidenav && this.sidenav.opened) {
                void this.sidenav.close();
            }
        });
        this.navService.navbarRowsSubject.next(this.navbarRows);
        this.navService.anchorsSubject.pipe(takeUntil(this.onDestroy)).subscribe(() => {
            this.navService.navbarRowsSubject.next(this.navService.navbarRowsSubject.value);
        });
    }

    ngOnDestroy(): void {
        this.onDestroy.next(undefined);
        this.onDestroy.complete();
    }

    ngAfterContentChecked(): void {
        this.updateHeights();
    }

    private updateHeights(): void {
        if (this.minHeight && typeof this.minHeight !== 'number') {
            throw new Error('Incorrect input data');
        }
        if (this.minHeightOtherElements && typeof this.minHeightOtherElements !== 'number') {
            throw new Error('Incorrect input data');
        }
        if (this.navbar) {
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
        this.screenWidthName = this.getCurrentScreenWidthName();
        this.navService.navbarRowsSubject.next(this.navService.navbarRowsSubject.value);
    }

    private getCurrentScreenWidthName(): 'lg' | 'md' | 'sm' {
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