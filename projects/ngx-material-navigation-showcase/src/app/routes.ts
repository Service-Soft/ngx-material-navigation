import { Routes } from '@angular/router';
import { NavbarRow, NavUtilities } from 'ngx-material-navigation';

export const navbarRows: NavbarRow[] = [
    {
        elements: [
            {
                type: 'imageWithInternalLink',
                url: 'https://pbs.twimg.com/profile_images/1498641868397191170/6qW2XkuI_400x400.png',
                link: {
                    route: 'home',
                },
                collapse: 'never'
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
                            path: 'home',
                            loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
                        }
                    },
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

export const routes: Routes = NavUtilities.getAngularRoutes(navbarRows);