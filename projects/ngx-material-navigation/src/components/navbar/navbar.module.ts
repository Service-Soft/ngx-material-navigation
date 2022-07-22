import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavElementModule } from './nav-element/nav-element.module';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
    declarations: [NavbarComponent],
    imports: [
        CommonModule,
        MatToolbarModule,
        NavElementModule,
        MatSidenavModule
    ],
    exports: [NavbarComponent]
})
export class NgxMatNavigationNavbarModule {}