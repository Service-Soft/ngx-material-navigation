import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatNavigationFooterModule, NgxMatNavigationNavbarModule, NGX_BURGER_MENU_ARIA_LABEL, NGX_BURGER_MENU_ICON } from 'ngx-material-navigation';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgxMatNavigationNavbarModule,
        NgxMatNavigationFooterModule
    ],
    providers: [
        {
            provide: NGX_BURGER_MENU_ICON,
            useValue: 'fas fa-home'
        },
        {
            provide: NGX_BURGER_MENU_ARIA_LABEL,
            useValue: 'Custom Aria Label'
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }