/* eslint-disable no-console */
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { NavElementTypes, NavRoute, NavUtilities, NavbarRow, NgxMatNavigationNotFoundComponent } from 'ngx-material-navigation';

import { CustomComponent } from './components/custom/custom.component';
import { footerRows } from './footer-rows';

export const navbarRows: NavbarRow<NavRoute>[] = [
    {
        elements: [
            {
                id: 'nav-logo',
                type: NavElementTypes.IMAGE_WITH_INTERNAL_LINK,
                url: 'https://placehold.co/400x400',
                height: 50,
                width: 50,
                link: {
                    route: 'home'
                },
                collapse: 'never',
                condition: conditionWithInjection
            },
            {
                id: 'nav-logo-2',
                type: NavElementTypes.IMAGE_WITH_INTERNAL_LINK,
                url: 'https://placehold.co/400x400',
                height: 50,
                width: 50,
                link: {
                    route: 'home'
                }
            },
            {
                id: 'nav-title-with-link',
                type: NavElementTypes.TITLE_WITH_INTERNAL_LINK,
                title: 'Showcase Project',
                link: {
                    route: 'home'
                },
                collapse: 'sm'
            },
            {
                id: 'nav-title',
                type: NavElementTypes.TITLE,
                title: 'Title'
            },
            {
                id: 'nav-home-link',
                type: NavElementTypes.INTERNAL_LINK,
                name: 'Home',
                icon: faHome,
                route: {
                    title: 'Home',
                    path: 'home',
                    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
                },
                collapse: 'md'
            },
            {
                id: 'nav-scrolling-link',
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
                                icon: faHome
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
                id: 'nav-menu',
                type: NavElementTypes.MENU,
                name: 'Menu',
                elements: [
                    {
                        id: 'nav-menu-home-link',
                        type: NavElementTypes.INTERNAL_LINK,
                        name: 'Home',
                        icon: faHome,
                        route: {
                            title: 'Home',
                            path: 'home',
                            loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
                        }
                    },
                    {
                        id: 'nav-menu-logo',
                        type: NavElementTypes.IMAGE_WITH_INTERNAL_LINK,
                        url: 'https://placehold.co/400x400',
                        height: 50,
                        width: 50,
                        link: {
                            route: 'home'
                        }
                    },
                    {
                        id: 'nav-menu-title-link',
                        type: NavElementTypes.TITLE_WITH_INTERNAL_LINK,
                        title: 'Showcase Project',
                        link: {
                            route: 'home'
                        }
                    },
                    {
                        id: 'nav-menu-reload-page-button',
                        type: NavElementTypes.BUTTON,
                        name: 'Reload Page',
                        icon: faRotateRight,
                        action: () => location.reload(),
                        position: 'right'
                    },
                    {
                        id: 'nav-menu-custom',
                        type: NavElementTypes.CUSTOM,
                        component: CustomComponent,
                        closeSidenavOnClick: true,
                        closeMenuOnClick: true
                    },
                    {
                        id: 'nav-menu-sub-menu-1',
                        type: NavElementTypes.MENU,
                        name: 'Sub Menu #1',
                        elements: [
                            {
                                id: 'nav-menu-sub-menu-1-custom',
                                type: NavElementTypes.CUSTOM,
                                component: CustomComponent
                            },
                            {
                                id: 'nav-menu-sub-menu-1-internal-link',
                                type: NavElementTypes.INTERNAL_LINK,
                                name: 'Link',
                                route: 'home'
                            }
                        ]
                    }
                ],
                collapse: 'md',
                position: 'center'
            },
            {
                id: 'nav-blog-link',
                type: NavElementTypes.INTERNAL_LINK,
                name: 'Blog',
                route: {
                    title: 'Blog',
                    path: 'blog',
                    loadComponent: () => import('./components/blog/blog.component').then(m => m.BlogComponent)
                }
            },
            {
                id: 'nav-reload-page-button',
                type: NavElementTypes.BUTTON,
                name: 'Reload Page',
                icon: faRotateRight,
                action: () => location.reload(),
                position: 'right',
                collapse: 'sm'
            }
        ]
    },
    {
        elements: [
            {
                id: 'nav-row-2-custom',
                type: NavElementTypes.CUSTOM,
                component: CustomComponent,
                collapse: 'md',
                closeSidenavOnClick: true
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
export const routes: NavRoute[] = NavUtilities.getAngularRoutes(navbarRows, footerRows, [
    {
        title: (snapshot) => `Blog Post ${snapshot.params['id']}`,
        path: 'blog/:id',
        loadComponent: () => import('./components/blog-post/blog-post.component').then(m => m.BlogPostComponent),
        data: {
            breadcrumbConfig: {
                name: (snapshot) => `Blog Post ${snapshot.params['id']}`,
                parentRoute: 'blog'
            }
        }
    },
    extraRoute
]);

function conditionWithInjection(): boolean {
    const router: Router = inject(Router);
    console.log('(This is used to test injections in conditions) Current Injected Route:', router.url);
    return true;
}