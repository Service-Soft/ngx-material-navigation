# NgxMaterialNavigation

Builds material navigation elements like a combined navbar and sidenav or footers based on the supplied configuration data. Will automatically move elements from the navbar to the sidenav at the provided breakpoints.

Supports nested menus and brings functionality which allow you to extract angular routes from an Configuration if you want to define the routes directly there.

# Table of Contents
- [NgxMaterialNavigation](#ngxmaterialnavigation)
- [Table of Contents](#table-of-contents)
- [Requirements](#requirements)
- [Basic Usage](#basic-usage)
  - [Define your configuration](#define-your-configuration)
  - [Extract the angular routes](#extract-the-angular-routes)
  - [Use the elements](#use-the-elements)
  - [Actions and conditions](#actions-and-conditions)
- [NavRoute](#navroute)
- [NgxMatNavigationNotFoundComponent](#ngxmatnavigationnotfoundcomponent)
# Requirements
This package relies on the [angular material library](https://material.angular.io/guide/getting-started) to render its components.
<br>
It also uses [bootstrap](https://getbootstrap.com/) for responsive design.

# Basic Usage
## Define your configuration
```typescript
import { NavbarRow, NavRoute } from 'ngx-material-navigation';

/**
 * The configuration consists of multiple NavbarRows.
 * This is needed if you want to have a toolbar with multiple rows.
 * 
 * In most cases you probably only define one NavbarRow in this array.
 * 
 * You can also provide a generic type for any angular routes in the elements.
 * This is helpful if you want to have type safety when using the routes data property.
 * Or when you want to enforce that a title/path etc. is required on every route.
*/
export const navbarRows: NavbarRow<NavRoute>[] = [
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
> 
```typescript
// Define any additional routes that are not defined in the NavbarRows.
const extraRoute: NavRoute = {
    title: '404 Page not found',
    path: '**',
    component: NgxMatNavigationNotFoundComponent,
    data: { // this is type safe
        pageNotFoundConfig: {
            homeRoute: '/home'
        }
    }
};
// Extract the angular routes from the given configuration. This can be used in the app.routing.module.ts
export const routes: NavRoute[] = NavUtilities.getAngularRoutes<NavRoute>(navbarRows, [extraRoute]);
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

## Actions and conditions
In your navigation data you can define actions that are executed when a button is clicked.
You can also define a condition function which defines whether or not the navigation element should be visible:
```typescript
...
{
    type: 'button',
    name: 'Reload the page',
    action: () => location.reload(),
    condition: conditionWithInjection,
    position: 'right',
    collapse: 'sm'
}
...
```
When the above button is clicked the current window gets reloaded. For the isUserLoggedIn-function this is a bit more tricky, as normally injections only work inside an angular context. We work around this by using the [EnvironmentInjector](https://angular.io/api/core/EnvironmentInjector), however <b>THIS REQUIRES YOU TO DEFINE ANY CONDITION AS AN EXTRA FUNCTION</b> (at least if you want to use injections).
```typescript
// This will work:
...
{
    type: 'button',
    name: 'Reload the page',
    action: () => location.reload(),
    condition: conditionWithInjection,
    position: 'right',
    collapse: 'sm'
}
...

function conditionWithInjection(): boolean {
    const router = inject(Router);
    console.log(router.url);
    return true;
}
```
```typescript
// This wont work:
...
{
    type: 'button',
    name: 'Reload the page',
    action: () => inject(Router).url.length > 10,
    condition: conditionWithInjection,
    position: 'right',
    collapse: 'sm'
}
...
```
# NavRoute
```typescript
/**
 * An opinionated model of the Angular Route.
 * This makes the title and path attributes required.
 * It also adds the option to use a generic for the route data.
 */
export interface NavRoute<DataType extends Data = DefaultNavRouteDataType> extends Route {
    // eslint-disable-next-line jsdoc/require-jsdoc
    title: string | Type<Resolve<string>> | ResolveFn<string>,
    // eslint-disable-next-line jsdoc/require-jsdoc
    path: string,
    // eslint-disable-next-line jsdoc/require-jsdoc
    data?: DataType
}

/**
 * The default data type for a nav route.
 * Will be used if no generic is provided.
 */
export interface DefaultNavRouteDataType extends Data {
    /**
     * The configuration for the 404 page not found component.
     */
    pageNotFoundConfig?: PageNotFoundConfig
}
```
# NgxMatNavigationNotFoundComponent
This is a simple 404-Error Page that can be used in your routing:
```typescript
import { PageNotFoundConfig, NavRoute, NgxMatNavigationNotFoundComponent } from 'ngx-material-navigation';

const pageNotFoundConfig: PageNotFoundConfig = {
    title?: string,
    message?: string,
    buttonLabel?: string,
    homeRoute?: string
}

const pageNotFoundRoute: NavRoute = {
    title: '404 Page not found',
    path: '**',
    component: NgxMatNavigationNotFoundComponent,
    data: {
        // this is optional for overriding the default values. When using NavRoute this is also type safe.
        pageNotFoundConfig: pageNotFoundConfig
    }
};
```
