import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { AfterContentChecked, Component, ElementRef, EnvironmentInjector, HostListener, Inject, InjectionToken, Input, runInInjectionContext, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { IconDefinition } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { BaseNavElement, NavElement, NavElementPosition, NavElementTypes } from '../../models/nav-element.model';
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
export const NGX_BURGER_MENU_ICON: InjectionToken<IconDefinition> = new InjectionToken<IconDefinition>(
    'Provider for the burger menu icon. Default: "faBars"',
    {
        providedIn: 'root',
        factory: () => faBars
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
        NavElementComponent
    ]
})
export class NgxMatNavigationNavbarComponent implements AfterContentChecked {
    /**
     * The navbar rows to build the navbar from.
     */
    @Input({ required: true })
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
    @ViewChild('navbar', { read: ElementRef, static: true })
    navbar?: ElementRef<HTMLElement>;

    // eslint-disable-next-line jsdoc/require-jsdoc
    @ViewChild('content', { read: ElementRef, static: true })
    content?: ElementRef<HTMLElement>;

    // eslint-disable-next-line jsdoc/require-jsdoc
    burgerMenu!: NavElement;

    /**
     * What screen size to collapse.
     */
    collapse!: 'xl' | 'lg' | 'md' | 'sm';

    /**
     * The minimum height of the navbar in sanitized.
     */
    sanitizedContentMinHeight!: SafeStyle;

    /**
     * Whether or not the sidenav is currently opened.
     */
    sidenavOpened: boolean = false;

    // eslint-disable-next-line jsdoc/require-returns
    /**
     * All sidenav elements which conditions are fulfilled.
     */
    get sidenavElements(): NavElement[] {
        const res: NavElement[] = [];
        // anchorRow is excluded from sidenav
        for (const row of this.navbarRows) {
            res.push(
                ...row.elements
                    .filter(e => this.checkCondition(e) && !this.checkVisible(e))
                    .map(e => ({ ...e, id: `sidenav-${e.id}` }))
            );
        }
        return res;
    }

    constructor(
        private readonly sanitizer: DomSanitizer,
        readonly navService: NgxMatNavigationService,
        @Inject(NGX_BURGER_MENU_ICON)
        burgerMenuIcon: IconDefinition,
        @Inject(NGX_BURGER_MENU_ARIA_LABEL)
        burgerMenuAriaLabel: string,
        private readonly injector: EnvironmentInjector,
        private readonly breakpointObserver: BreakpointObserver
    ) {
        this.burgerMenu = {
            id: 'burger-menu',
            type: NavElementTypes.BUTTON_FLAT,
            name: '',
            icon: burgerMenuIcon,
            action: () => this.sidenavOpened = !this.sidenavOpened,
            collapse: 'never',
            ariaLabel: burgerMenuAriaLabel
        };

        this.breakpointObserver.observe(['(max-width: 767px)', '(max-width: 991px)', '(max-width: 1199px)'])
            .pipe(takeUntilDestroyed())
            .subscribe(result => {
                if (result.breakpoints['(max-width: 767px)']) {
                    this.collapse = 'sm';
                }
                else if (result.breakpoints['(max-width: 991px)']) {
                    this.collapse = 'md';
                }
                else if (result.breakpoints['(max-width: 1199px)']) {
                    this.collapse = 'lg';
                }
                else {
                    this.collapse = 'xl';
                }
            });
    }

    /**
     * Gets thee navbar elements for the row with the given index at the given position.
     * @param row - The index of the row to get the elements for.
     * @param position - Where in the row the elements are positioned.
     * @returns An array of the resolved navbar elements.
     */
    getNavbarElements(row: NavbarRow, position: NavElementPosition): NavElement[] {
        return row.elements.filter(e => {
            return (
                (e.position === position)
                || (e.position == undefined && position === 'left')
            )
            && this.checkCondition(e)
            && this.checkVisible(e);
        });
    }

    private checkCondition(element: NavElement): boolean {
        if (!element.condition) {
            return true;
        }
        // runInInjectionContext(...) is needed to enable the user to use injections in his condition functions.
        return runInInjectionContext(this.injector, () => element.condition ? element.condition() : true);
    }

    private checkVisible(element: NavElement): boolean {
        const collapse: BaseNavElement['collapse'] = element.collapse ?? 'sm';
        switch (collapse) {
            case 'always': {
                return false;
            }
            case 'never': {
                return true;
            }
            case 'lg': {
                return this.collapse === 'xl';
            }
            case 'md': {
                return ['lg', 'xl'].includes(this.collapse);
            }
            case 'sm': {
                return ['md', 'lg', 'xl'].includes(this.collapse);
            }
        }
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    getElementClass(element: NavElement): string {
        return `collapse-${element.collapse ?? 'sm'}`;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    getBurgerMenuClass(): string {
        if (this.sidenavElements.find(e => e.collapse === 'always')) {
            return 'burger-always';
        }
        if (this.sidenavElements.find(e => e.collapse === 'lg')) {
            return 'burger-lg';
        }
        if (this.sidenavElements.find(e => e.collapse === 'md')) {
            return 'burger-md';
        }
        if (this.sidenavElements.find(e => e.collapse === 'sm' || e.collapse === undefined)) {
            return 'burger-sm';
        }
        return 'burger-never';
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
        if (!this.navbar) {
            return;
        }
        if (!this.minHeight || (this.navbar.nativeElement.offsetHeight > this.minHeight)) {
            this.sanitizedContentMinHeight = this.sanitizer.bypassSecurityTrustStyle(
                `calc(100vh - 0px - ${this.navbar.nativeElement.offsetHeight + (this.minHeightOtherElements ?? 0)}px)`
            );
            return;
        }
        this.sanitizedContentMinHeight = this.sanitizer.bypassSecurityTrustStyle(
            `calc(100vh - 0px - ${(this.minHeight ?? 0) + (this.minHeightOtherElements ?? 0)}px)`
        );
    }

    /**
     * Updates the current screen width and filters the sidenav elements accordingly.
     * @throws When no height data is provided or the data is invalid.
     */
    @HostListener('window:resize')
    onResize(): void {
        this.updateHeights();
        this.sidenavOpened = false;
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
            case NavElementTypes.CUSTOM: {
                return;
            }
            case NavElementTypes.TITLE_WITH_INTERNAL_LINK:
            case NavElementTypes.TITLE_WITH_EXTERNAL_LINK:
            case NavElementTypes.IMAGE_WITH_INTERNAL_LINK:
            case NavElementTypes.IMAGE_WITH_EXTERNAL_LINK:
            case NavElementTypes.INTERNAL_LINK:
            case NavElementTypes.BUTTON:
            case NavElementTypes.BUTTON_FLAT:
            case NavElementTypes.EXTERNAL_LINK:
            case NavElementTypes.TEXT: {
                this.sidenavOpened = false;
            }
        }
    }
}