
import { CdkMenuModule, CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { AfterContentChecked, Component, ElementRef, HostListener, Input, model, ModelSignal, OnInit, ViewChild } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

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
import { DisableHoverDirective } from '../../directives/disable-hover.directive';
import { NavElement, NavElementTypes } from '../../models/nav-element.model';
import { NavMenu } from '../../models/nav-menu.model';
import { NavUtilities } from '../../utilities/nav.utilities';

/**
 * Displays a single Navigation Element.
 */
@Component({
    selector: 'ngx-mat-navigation-element',
    templateUrl: './nav-element.component.html',
    styleUrls: ['./nav-element.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        CdkMenuModule,
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
        FaIconComponent,
        DisableHoverDirective
    ]
})
export class NavElementComponent implements AfterContentChecked, OnInit {

    // eslint-disable-next-line jsdoc/require-jsdoc
    NavElementTypes: typeof NavElementTypes = NavElementTypes;

    /**
     * The element to display.
     */
    @Input({ required: true })
    element!: NavElement;

    /**
     * A list of all the buttons that .
     */
    @Input()
    parentMenusButtons: CdkMenuTrigger[] = [];
    // eslint-disable-next-line jsdoc/require-jsdoc
    protected get internalParentMenusButtons(): CdkMenuTrigger[] {
        return this.menuButton ? [...this.parentMenusButtons, this.menuButton] : this.parentMenusButtons;
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    elementMenu!: NavMenu & Required<Pick<NavMenu, 'iconState'>>;

    /**
     * A reference to the sidenav. Is needed for the menu to close the sidenav.
     */
    sidenavOpened: ModelSignal<boolean | undefined> = model<boolean>();

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
    @ViewChild('menuButton', { read: CdkMenuTrigger, static: false })
    menuButton?: CdkMenuTrigger;
    // eslint-disable-next-line jsdoc/require-jsdoc
    @ViewChild('menuButtonElement', { read: ElementRef, static: false })
    menuButtonElement?: ElementRef<HTMLButtonElement>;

    // eslint-disable-next-line jsdoc/require-jsdoc
    menuWidth!: number;

    ngOnInit(): void {
        this.internalIsSidenavElement = this.isSidenavElement ?? false;
        this.internalIsMenuItem = this.isMenuItem ?? false;
        this.elementMenu = {
            ...NavUtilities.asMenu(this.element),
            iconState: NavUtilities.asMenu(this.element).iconState ?? faChevronDown
        };
    }

    ngAfterContentChecked(): void {
        this.onResize();
    }

    /**
     * Updates the width of the menu to the value of its button.
     */
    @HostListener('window:resize', ['$event'])
    onResize(): void {
        if (this.menuButtonElement) {
            this.menuWidth = this.menuButtonElement.nativeElement.offsetWidth;
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
            case NavElementTypes.TEXT:
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
            case NavElementTypes.EXTERNAL_LINK: {
                this.sidenavOpened?.set(false);
            }
        }
    }

    /**
     * Defines if the menu should be closed when the given item is clicked.
     * @param item - The item that has been clicked.
     */
    clickMenuItem(item: NavElement): void {
        switch (item.type) {
            case NavElementTypes.TITLE:
            case NavElementTypes.IMAGE:
            case NavElementTypes.MENU:
            case NavElementTypes.TEXT:
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
            case NavElementTypes.EXTERNAL_LINK: {
                this.menuButton?.close();
                for (const button of this.parentMenusButtons.reverse()) {
                    button.close();
                }
            }
        }
    }
}