import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavButtonFlatComponent } from './button/nav-button-flat/nav-button-flat.component';
import { NavButtonComponent } from './button/nav-button/nav-button.component';
import { NavHtmlComponent } from './html/nav-html/nav-html.component';
import { NavImageWithExternalLinkComponent } from './image/nav-image-with-external-link/nav-image-with-external-link.component';
import { NavImageWithInternalLinkComponent } from './image/nav-image-with-internal-link/nav-image-with-internal-link.component';
import { NavImageComponent } from './image/nav-image/nav-image.component';
import { NavExternalLinkComponent } from './link/nav-external-link/nav-external-link.component';
import { NavInternalLinkComponent } from './link/nav-internal-link/nav-internal-link.component';
import { NavElementComponent } from './nav-element.component';
import { NavTextComponent } from './text/nav-text/nav-text.component';
import { NavTitleWithExternalLinkComponent } from './title/nav-title-with-external-link/nav-title-with-external-link.component';
import { NavTitleWithInternalLinkComponent } from './title/nav-title-with-internal-link/nav-title-with-internal-link.component';
import { NavTitleComponent } from './title/nav-title/nav-title.component';

@NgModule({
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
        NavHtmlComponent,
        NavTextComponent
    ],
    declarations: [
        NavElementComponent
    ],
    exports: [NavElementComponent]
})
export class NavElementModule { }