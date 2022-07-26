import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMatNavigationFooterComponent } from './footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterElementModule } from './footer-element/footer-element.module';

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        FooterElementModule
    ],
    declarations: [NgxMatNavigationFooterComponent],
    exports: [NgxMatNavigationFooterComponent]
})
export class NgxMatNavigationFooterModule { }