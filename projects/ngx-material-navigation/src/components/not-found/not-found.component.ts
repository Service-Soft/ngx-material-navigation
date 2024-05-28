import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { PageNotFoundConfig } from '../../models/page-not-found-config.model';

/**
 * A default 404 Not found page to display when the user tries to access an unknown resource.
 */
@Component({
    selector: 'ngx-mat-navigation-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        RouterModule
    ]
})
export class NgxMatNavigationNotFoundComponent implements OnInit {
    /**
     * The custom configuration for the 404 Page.
     * You can alternatively define this on the data of the route with the key 'pageNotFoundData'.
     */
    @Input()
    config?: PageNotFoundConfig;

    // eslint-disable-next-line jsdoc/require-jsdoc
    title!: string;
    // eslint-disable-next-line jsdoc/require-jsdoc
    message!: string;
    // eslint-disable-next-line jsdoc/require-jsdoc
    buttonLabel!: string;
    // eslint-disable-next-line jsdoc/require-jsdoc
    homeRoute!: string;

    constructor(private readonly route: ActivatedRoute) {}

    ngOnInit(): void {
        const routeData: PageNotFoundConfig | undefined = this.route.snapshot.data['pageNotFoundConfig'] as PageNotFoundConfig | undefined;
        this.title = this.config?.title ?? routeData?.title ?? 'Page not found';
        this.message = this.config?.message
        ?? routeData?.message
        ?? 'The page you are looking for might have been removed, had its name changed or is temporarily unavailable.';
        this.buttonLabel = this.config?.buttonLabel ?? routeData?.buttonLabel ?? 'Homepage';
        this.homeRoute = this.config?.homeRoute ?? routeData?.homeRoute ?? '/';
    }
}