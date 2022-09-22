import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageNotFoundConfig } from '../../models/page-not-found-config.model';

/**
 * A default 404 Not found page to display when the user tries to access an unknown resource.
 */
@Component({
    selector: 'ngx-mat-navigation-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NgxMatNavigationNotFoundComponent implements OnInit {
    /**
     * The custom configuration for the 404 Page.
     * You can alternatively define this on the data of the route with the key 'pageNotFoundData'.
     */
    @Input()
    config?: PageNotFoundConfig;

    title!: string;
    message!: string;
    buttonLabel!: string;
    homeRoute!: string;

    constructor(private readonly route: ActivatedRoute) {}

    ngOnInit(): void {
        const routeData: PageNotFoundConfig | undefined = this.route.snapshot.data['pageNotFoundConfig'] as PageNotFoundConfig | undefined;
        this.title = this.config?.title ?? routeData?.title ?? 'Page not found';
        // eslint-disable-next-line max-len
        this.message = this.config?.message ?? routeData?.message ?? 'The page you are looking for might have been removed, had its name changed or is temporarily unavailable.';
        this.buttonLabel = this.config?.buttonLabel ?? routeData?.buttonLabel ?? 'Homepage';
        this.homeRoute = this.config?.homeRoute ?? routeData?.homeRoute ?? '/';
    }
}