/* eslint-disable no-console */
/* eslint-disable jsdoc/require-jsdoc */
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavElementTypes, NavRoute, NavUtilities, NavbarRow, NgxMatNavigationNotFoundComponent } from 'ngx-material-navigation';
import { CustomComponent } from './components/custom/custom.component';
import { footerRows } from './footer-rows';

export const navbarRows: NavbarRow<NavRoute>[] = [
    {
        elements: [
            {
                type: NavElementTypes.IMAGE_WITH_INTERNAL_LINK,
                url: 'https://pbs.twimg.com/profile_images/1498641868397191170/6qW2XkuI_400x400.png',
                height: 50,
                link: {
                    route: 'home'
                },
                collapse: 'never',
                condition: conditionWithInjection
            },
            {
                type: NavElementTypes.TITLE_WITH_INTERNAL_LINK,
                title: 'Showcase Project',
                link: {
                    route: 'home'
                },
                collapse: 'sm'
            },
            {
                type: NavElementTypes.INTERNAL_LINK,
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
                type: NavElementTypes.INTERNAL_LINK,
                name: 'Scrolling',
                route: {
                    title: 'Scrolling',
                    path: 'scrolling',
                    loadComponent: () => import('./components/scrolling/scrolling.component').then(m => m.ScrollingComponent),
                    data: {
                        anchors: [
                            {
                                name: 'Bottom',
                                fragment: 'bottom',
                                icon: 'fas fa-home'
                            },
                            {
                                name: 'Middle',
                                fragment: 'middle'
                            },
                            {
                                name: 'Test for responsiveness',
                                fragment: 'test'
                            }
                        ]
                    }
                },
                collapse: 'md'
            },
            {
                type: NavElementTypes.MENU,
                name: 'Menu',
                elements: [
                    {
                        type: NavElementTypes.INTERNAL_LINK,
                        name: 'Home',
                        icon: 'fas fa-home',
                        route: {
                            title: 'Home',
                            path: 'home',
                            loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
                        }
                    },
                    {
                        type: NavElementTypes.IMAGE_WITH_INTERNAL_LINK,
                        url: 'https://pbs.twimg.com/profile_images/1498641868397191170/6qW2XkuI_400x400.png',
                        height: 50,
                        link: {
                            route: 'home'
                        }
                    },
                    {
                        type: NavElementTypes.TITLE_WITH_INTERNAL_LINK,
                        title: 'Showcase Project',
                        link: {
                            route: 'home'
                        }
                    },
                    {
                        type: NavElementTypes.BUTTON,
                        name: 'Reload Page',
                        icon: 'fas fa-rotate-right',
                        action: () => location.reload(),
                        position: 'right'
                    },
                    {
                        type: NavElementTypes.CUSTOM,
                        component: CustomComponent
                    },
                    {
                        type: NavElementTypes.MENU,
                        name: 'Menu',
                        elements: [
                            {
                                type: NavElementTypes.CUSTOM,
                                component: CustomComponent
                            }
                        ]
                    }
                ],
                collapse: 'md',
                position: 'center'
            },
            {
                type: NavElementTypes.BUTTON,
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
                type: NavElementTypes.CUSTOM,
                component: CustomComponent,
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
export const routes: NavRoute[] = NavUtilities.getAngularRoutes(navbarRows, footerRows, [extraRoute]);

function conditionWithInjection(): boolean {
    const router: Router = inject(Router);
    console.log(router.url);
    return true;
}