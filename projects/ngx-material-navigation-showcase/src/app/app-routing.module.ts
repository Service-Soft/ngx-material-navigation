import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule } from '@angular/router';
import { routes } from './routes';

const routerOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload',
    anchorScrolling: 'enabled'
};

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }