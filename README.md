# NgxMaterialNavigation

Builds material navigation elements like a combined navbar and sidenav or footers based on the supplied configuration data. Will automatically move elements from the navbar to the sidenav at the provided breakpoints.

Supports nested menus and brings functionality which allow you to extract angular routes from an Configuration if you want to define the routes directly there.

# Table of Contents
- [NgxMaterialNavigation](#ngxmaterialnavigation)
- [Table of Contents](#table-of-contents)
- [Requirements](#requirements)
- [Basic Usage](#basic-usage)
  - [Define your configuration:](#define-your-configuration)
  - [Extract the angular routes](#extract-the-angular-routes)
  - [Use the elements](#use-the-elements)

# Requirements
This package relies on the [angular material library](https://material.angular.io/guide/getting-started) to render its components.
<br>
It also uses [bootstrap](https://getbootstrap.com/) for responsive design.

# Basic Usage
## Define your configuration:
```typescript
import { NavbarRow } from 'ngx-material-navigation';

/**
 * The configuration consists of multiple NavbarRows.
 * This is needed if you want to have a toolbar with multiple rows.
 * 
 * In most cases you probably only define one NavbarRow in this array.
*/
export const navbarRows: NavbarRow[] = [
    {
        elements: [
            {
                type: 'imageWithInternalLink',
                url: 'https://www.my-great-website.de/my-great-picture.png',
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
                route: { // This can also just be a string.
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
                        name: 'menu item #1',
                        route: 'menu-item/1'
                    },
                    {
                        type: 'internalLink',
                        name: 'menu item #2',
                        route: 'menu-item/2'
                    }
                ],
                position: 'center',
                collapse: 'md'
            },
            {
                type: 'button',
                name: 'Reload the page',
                action: () => location.reload(),
                position: 'right',
                collapse: 'sm'
            }
        ]
    }
];
```
## Extract the angular routes
> :warning: Optional:
> <br>
> You only need this if you want to define your angular routes inside the NavbarRows.
```typescript
/**
 * Define any additional routes that are not defined in the NavbarRows.
*/
export const additionalRoutes: Routes = [
    {
        path: 'menu-item/:number',
        loadChildren: () => import('./components/showcase-inputs/showcase-inputs.module').then(m => m.ShowcaseInputsModule)
    }
]

// Extract the angular routes from the given configuration. This can be used in the app.routing.module.ts
export const routes: Routes = NavUtilities.getAngularRoutes(navbarRows, additionalRoutes);
```
## Use the elements
In app.component.html:
```html
<ngx-mat-navigation-navbar [minHeight]="70" [minSidenavWidth]="'30%'" [minHeightOtherElements]="70" [navbarRows]="navbarRows">
    <!-- The content of your app needs to be put inside the navbar -->
    <router-outlet></router-outlet>
</ngx-mat-navigation-navbar>

<app-footer [minHeight]="70"></app-footer>
```
Please note that all of your content needs to be put inside the navbar. This is needed to put it inside the mat-sidenav-content.

The minHeight and minHeightOtherElements is needed internally to set the min-height of the content accordingly.