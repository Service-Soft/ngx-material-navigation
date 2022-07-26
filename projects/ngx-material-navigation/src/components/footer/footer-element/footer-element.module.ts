import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterElementComponent } from './footer-element.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NavMenuModule } from '../../navbar/nav-menu/nav-menu.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatMenuModule,
        MatButtonModule,
        NavMenuModule
    ],
    declarations: [FooterElementComponent],
    exports: [FooterElementComponent]
})
export class FooterElementModule { }