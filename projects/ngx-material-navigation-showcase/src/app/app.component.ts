import { AfterContentChecked, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterRow, NavbarRow, NgxMatNavigationFooterComponent, NgxMatNavigationNavbarComponent } from 'ngx-material-navigation';

import { footerRows } from './footer-rows';
import { navbarRows } from './routes';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        RouterModule,
        NgxMatNavigationNavbarComponent,
        NgxMatNavigationFooterComponent
    ]
})
export class AppComponent implements AfterContentChecked {
    navbarRows: NavbarRow[] = navbarRows;
    footerRows: FooterRow[] = footerRows;

    @ViewChild('footer', { read: ElementRef })
    footer?: ElementRef<HTMLElement>;

    footerHeight!: number;

    ngAfterContentChecked(): void {
        this.onResize();
    }

    @HostListener('window:resize', ['$event'])
    onResize(): void {
        if (this.footer) {
            this.footerHeight = this.footer.nativeElement.offsetHeight;
        }
    }
}