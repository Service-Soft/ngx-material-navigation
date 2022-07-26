import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMatNavigationNavbarComponent } from './navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavElementModule } from './nav-element/nav-element.module';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
    declarations: [NgxMatNavigationNavbarComponent],
    imports: [
        CommonModule,
        MatToolbarModule,
        NavElementModule,
        MatSidenavModule
    ],
    exports: [NgxMatNavigationNavbarComponent]
})
export class NgxMatNavigationNavbarModule {}