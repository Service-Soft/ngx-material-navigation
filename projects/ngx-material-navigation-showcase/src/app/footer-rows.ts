import { FooterRow, NavElementTypes } from 'ngx-material-navigation';
import { CustomComponent } from './components/custom/custom.component';

export const footerRows: FooterRow[] = [
    {
        elements: [
            {
                type: NavElementTypes.IMAGE_WITH_INTERNAL_LINK,
                height: 100,
                url: 'https://pbs.twimg.com/profile_images/1498641868397191170/6qW2XkuI_400x400.png',
                link: {
                    route: 'home'
                }
            }
        ]
    },
    {
        elements: [
            {
                type: NavElementTypes.TITLE,
                title: 'Test Title'
            },
            {
                type: NavElementTypes.TEXT,
                paragraphs: [
                    // eslint-disable-next-line max-len
                    'This is an example text for the ngx-mat-navigation-footer. This is an example text for the ngx-mat-navigation-footer. This is an example text for the ngx-mat-navigation-footer.'
                ]
            },
            {
                type: NavElementTypes.CUSTOM,
                component: CustomComponent,
                position: 'center'
            },
            {
                type: NavElementTypes.TITLE,
                title: 'Test Title Right',
                position: 'right'
            }
        ]
    },
    {
        elements: [
            {
                type: NavElementTypes.TITLE,
                title: 'Copyright',
                position: 'center'
            }
        ]
    }
];