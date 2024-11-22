
import { CommonModule } from '@angular/common';
import { AfterContentChecked, Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { NavButtonComponent } from './button/nav-button/nav-button.component';
import { NavButtonFlatComponent } from './button/nav-button-flat/nav-button-flat.component';
import { NavCustomComponent } from './custom/nav-custom/nav-custom.component';
import { NavImageComponent } from './image/nav-image/nav-image.component';
import { NavImageWithExternalLinkComponent } from './image/nav-image-with-external-link/nav-image-with-external-link.component';
import { NavImageWithInternalLinkComponent } from './image/nav-image-with-internal-link/nav-image-with-internal-link.component';
import { NavExternalLinkComponent } from './link/nav-external-link/nav-external-link.component';
import { NavInternalLinkComponent } from './link/nav-internal-link/nav-internal-link.component';
import { NavTextComponent } from './text/nav-text/nav-text.component';
import { NavTitleComponent } from './title/nav-title/nav-title.component';
import { NavTitleWithExternalLinkComponent } from './title/nav-title-with-external-link/nav-title-with-external-link.component';
import { NavTitleWithInternalLinkComponent } from './title/nav-title-with-internal-link/nav-title-with-internal-link.component';
import { NavElement, NavElementTypes } from '../../models/nav-element.model';
import { NavMenu } from '../../models/nav-menu.model';
import { NavUtilities } from '../../utilities/nav.utilities';

/**
 * Displays a single Navigation Element.
 */
@Component({
    standalone: true,
    selector: 'ngx-mat-navigation-element',
    templateUrl: './nav-element.component.html',
    styleUrls: ['./nav-element.component.scss'],
    imports: [
        CommonModule,
        MatMenuModule,
        MatButtonModule,
        MatSidenavModule,
        NavTitleComponent,
        NavTitleWithInternalLinkComponent,
        NavTitleWithExternalLinkComponent,
        NavImageComponent,
        NavImageWithInternalLinkComponent,
        NavImageWithExternalLinkComponent,
        NavButtonComponent,
        NavButtonFlatComponent,
        NavInternalLinkComponent,
        NavExternalLinkComponent,
        NavCustomComponent,
        NavTextComponent,
        FaIconComponent
    ]
})
export class NavElementComponent implements AfterContentChecked, OnInit {

    // eslint-disable-next-line jsdoc/require-jsdoc
    NavElementTypes: typeof NavElementTypes = NavElementTypes;

    /**
     * The element to display.
     */
    @Input()
    element!: NavElement;

    // eslint-disable-next-line jsdoc/require-jsdoc
    elementMenu!: NavMenu;

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
    // eslint-disable-next-line jsdoc/require-jsdoc
    protected internalIsSidenavElement!: boolean;

    /**
     * Whether or not this element should be displayed inside a menu.
     * Used to apply different styling.
     */
    @Input()
    isMenuItem?: boolean;
    // eslint-disable-next-line jsdoc/require-jsdoc
    protected internalIsMenuItem!: boolean;

    // eslint-disable-next-line jsdoc/require-jsdoc
    @ViewChild('menuButton')
    menuButton?: MatButton;

    // eslint-disable-next-line jsdoc/require-jsdoc
    menuWidth!: number;

    ngOnInit(): void {
        this.internalIsSidenavElement = this.isSidenavElement ?? false;
        this.internalIsMenuItem = this.isMenuItem ?? false;
        this.elementMenu = NavUtilities.asMenu(this.element);
    }

    ngAfterContentChecked(): void {
        this.onResize();
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
     * @param element - The element that has been clicked.
     */
    async clickSidenavElement(element: NavElement): Promise<void> {
        switch (element.type) {
            case NavElementTypes.TITLE:
            case NavElementTypes.IMAGE:
            case NavElementTypes.MENU:
            case NavElementTypes.CUSTOM: {
                return;
            }
            default: {
                await this.sidenav?.close();
            }
        }
    }
}