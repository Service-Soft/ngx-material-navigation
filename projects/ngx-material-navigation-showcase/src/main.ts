import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { InMemoryScrollingOptions, RouterConfigOptions, provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';
import { NGX_BURGER_MENU_ARIA_LABEL, NGX_BURGER_MENU_ICON } from 'ngx-material-navigation';

import { AppComponent } from './app/app.component';
import { routes } from './app/routes';
import { environment } from './environments/environment';

const routerOptions: RouterConfigOptions = {
    onSameUrlNavigation: 'reload'
};

const scrollConfig: InMemoryScrollingOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
};

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(
    AppComponent,
    {
        providers: [
            provideRouter(routes, withInMemoryScrolling(scrollConfig), withRouterConfig(routerOptions)),
            provideAnimations(),
            {
                provide: NGX_BURGER_MENU_ICON,
                useValue: 'fas fa-home'
            },
            {
                provide: NGX_BURGER_MENU_ARIA_LABEL,
                useValue: 'Custom Aria Label'
            }
        ]
    }
// eslint-disable-next-line promise/prefer-await-to-callbacks, no-console
).catch(error => console.error(error));