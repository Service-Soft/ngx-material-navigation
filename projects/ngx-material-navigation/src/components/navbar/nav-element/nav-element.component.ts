import { AfterContentChecked, Component, EnvironmentInjector, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NavElement } from '../../../models/nav.model';
import { NavUtilities } from '../../../utilities/nav.utilities';
import { PurifyUtilities } from '../../../utilities/purify.utilities';
import { MatSidenav } from '@angular/material/sidenav';
import { MatButton } from '@angular/material/button';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Displays a single Navigation Element.
 */
@Component({
    selector: 'ngx-mat-navigation-element',
    templateUrl: './nav-element.component.html',
    styleUrls: ['./nav-element.component.scss']
})
export class NavElementComponent implements AfterContentChecked, OnInit {

    NavUtilities = NavUtilities;

    /**
     * The element to display.
     */
    @Input()
    element!: NavElement;

    sanitizedHtml?: SafeHtml;

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
    menuButton?: MatButton;

    menuWidth!: number;

    constructor(private readonly sanitizer: DomSanitizer, private readonly injector: EnvironmentInjector) {}

    ngOnInit(): void {
        if (NavUtilities.isNavHtml(this.element)) {
            this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(PurifyUtilities.sanitize(this.element.html));
        }
    }

    ngAfterContentChecked(): void {
        if (this.menuButton) {
            this.menuWidth = this.getMenuWidth();
        }
    }

    /**
     * Runs the action of the element.
     * This wrapper is needed to enable the user to use injections in his action functions.
     */
    runAction(): void {
        this.injector.runInContext(() => this.NavUtilities.asButton(this.element).action());
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
}