import { Component } from '@angular/core';
import { NavElementTypes, NgxMatNavigationBaseNavElementComponent } from 'ngx-material-navigation';

/**
 * A custom navigation component.
 */
@Component({
    selector: 'app-custom',
    templateUrl: './custom.component.html',
    styleUrls: ['./custom.component.scss']
})
export class CustomComponent extends NgxMatNavigationBaseNavElementComponent<NavElementTypes.CUSTOM> {}