import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavElementModule } from '../nav-element/nav-element.module';
import { NgxMatNavigationFooterComponent } from './footer.component';

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        NavElementModule
    ],
    declarations: [NgxMatNavigationFooterComponent],
    exports: [NgxMatNavigationFooterComponent]
})
export class NgxMatNavigationFooterModule { }