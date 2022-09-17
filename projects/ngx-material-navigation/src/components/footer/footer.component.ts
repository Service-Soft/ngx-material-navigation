import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FooterRow } from '../../models/footer.model';
import { NgxMatNavigationService } from '../../services/nav.service';

/**
 * Displays a footer based on the provided input data.
 */
@Component({
    selector: 'ngx-mat-navigation-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class NgxMatNavigationFooterComponent implements OnInit, OnDestroy {
    private readonly onDestroy: Subject<void> = new Subject();

    /**
     * The minimum height of the footer.
     */
    @Input()
    minHeight!: number;

    /**
     * The footer rows to build the footer from.
     */
    @Input()
    footerRows!: FooterRow[];

    internalFooterRows: FooterRow[] = [];

    constructor(public navService: NgxMatNavigationService) { }

    ngOnInit(): void {
        this.navService.footerRowsSubject.pipe(takeUntil(this.onDestroy)).subscribe(footerRows => {
            this.internalFooterRows = footerRows;
        });
        this.navService.footerRowsSubject.next(this.footerRows);
    }

    ngOnDestroy(): void {
        this.onDestroy.next(undefined);
        this.onDestroy.complete();
    }
}