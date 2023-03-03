import { Component, Input } from '@angular/core';
import { NavButton } from '../../models/nav-button.model';
import { NavCustom } from '../../models/nav-custom.model';
import { NavImage, NavImageWithExternalLink, NavImageWithInternalLink } from '../../models/nav-image.model';
import { NavExternalLink, NavInternalLink } from '../../models/nav-link.model';
import { NavMenu } from '../../models/nav-menu.model';
import { NavText } from '../../models/nav-text.model';
import { NavTitle, NavTitleWithExternalLink, NavTitleWithInternalLink } from '../../models/nav-title.model';
import { NavElement, NavElementTypes } from '../../models/nav.model';

/**
 * The abstract base class of any ngx-mat-navigation nav element.
 *
 * It already provides the elementValue: Just the typed version of the element.
 */
@Component({
    selector: 'ngx-mat-navigation-base-nav-element',
    template: ''
})
export abstract class NgxMatNavigationBaseNavElementComponent<Type extends NavElementTypes> {
    /**
     * The input nav element to display.
     */
    @Input()
    element!: NavElement;

    /**
     * Whether or not the element is inside a sidenav.
     */
    @Input()
    isSidenavElement!: boolean;

    /**
     * Whether or not the element is inside a menu.
     */
    @Input()
    isMenuItem!: boolean;

    // eslint-disable-next-line jsdoc/require-returns
    /**
     * The nav element correctly typed.
     */
    get elementValue(): NavElementType<Type> {
        return this.element as NavElementType<Type>;
    }
}

/**
 * Gives the metadata-config Type based on the DecoratorTypes enum.
 */
export type NavElementType<T> =
    T extends NavElementTypes.TITLE ? NavTitle
    : T extends NavElementTypes.TITLE_WITH_INTERNAL_LINK ? NavTitleWithInternalLink
    : T extends NavElementTypes.TITLE_WITH_EXTERNAL_LINK ? NavTitleWithExternalLink
    : T extends NavElementTypes.IMAGE ? NavImage
    : T extends NavElementTypes.IMAGE_WITH_INTERNAL_LINK ? NavImageWithInternalLink
    : T extends NavElementTypes.IMAGE_WITH_EXTERNAL_LINK ? NavImageWithExternalLink
    : T extends NavElementTypes.INTERNAL_LINK ? NavInternalLink
    : T extends NavElementTypes.EXTERNAL_LINK ? NavExternalLink
    : T extends NavElementTypes.BUTTON ? NavButton
    : T extends NavElementTypes.BUTTON_FLAT ? NavButton
    : T extends NavElementTypes.MENU ? NavMenu
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    : T extends NavElementTypes.CUSTOM ? NavCustom<any>
    : T extends NavElementTypes.TEXT ? NavText
    : never;