import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMatNavigationNotFoundComponent } from './not-found.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        RouterModule
    ],
    declarations: [NgxMatNavigationNotFoundComponent],
    exports: [NgxMatNavigationNotFoundComponent]
})
export class NgxMatNavigationNotFoundModule { }