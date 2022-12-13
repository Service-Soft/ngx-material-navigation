/* eslint-disable no-console */
/* eslint-disable jsdoc/require-jsdoc */
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarRow, NavUtilities, NgxMatNavigationNotFoundComponent } from 'ngx-material-navigation';
import { NavRoute } from 'projects/ngx-material-navigation/src/models/nav-route.model';

export const navbarRows: NavbarRow<NavRoute>[] = [
    {
        elements: [
            {
                type: 'imageWithInternalLink',
                url: 'https://pbs.twimg.com/profile_images/1498641868397191170/6qW2XkuI_400x400.png',
                link: {
                    route: 'home'
                },
                collapse: 'never',
                condition: conditionWithInjection
            },
            {
                type: 'titleWithInternalLink',
                title: 'Showcase Project',
                link: {
                    route: 'home'
                },
                collapse: 'sm'
            },
            {
                type: 'internalLink',
                name: 'Home',
                icon: 'fas fa-home',
                route: {
                    title: 'Home',
                    path: 'home',
                    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
                },
                collapse: 'md'
            },
            {
                type: 'menu',
                name: 'Menu',
                elements: [
                    {
                        type: 'internalLink',
                        name: 'Home',
                        icon: 'fas fa-home',
                        route: {
                            title: 'Home',
                            path: 'home',
                            loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
                        }
                    }
                ],
                collapse: 'md',
                position: 'center'
            },
            {
                type: 'button',
                name: 'Reload Page',
                icon: 'fas fa-rotate-right',
                action: () => location.reload(),
                position: 'right',
                collapse: 'sm'
            }
        ]
    },
    {
        elements: [
            {
                type: 'html',
                html: '<h1 class="sanitizedClass">Test</h1>',
                collapse: 'md'
            }
        ]
    }
];

// Define any additional routes that are not defined in the NavbarRows.
const extraRoute: NavRoute = {
    title: '404 Page not found',
    path: '**',
    component: NgxMatNavigationNotFoundComponent,
    data: {
        pageNotFoundConfig: {
            homeRoute: '/home'
        }
    }
};
// Extract the angular routes from the given configuration. This can be used in the app.routing.module.ts
export const routes: NavRoute[] = NavUtilities.getAngularRoutes(navbarRows, [extraRoute]);

function conditionWithInjection(): boolean {
    const router: Router = inject(Router);
    console.log(router.url);
    return true;
}