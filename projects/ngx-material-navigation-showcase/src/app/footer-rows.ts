import { FooterRow, NavElementTypes } from 'ngx-material-navigation';

import { CustomComponent } from './components/custom/custom.component';

export const footerRows: FooterRow[] = [
    {
        elements: [
            {
                id: 'footer-logo',
                type: NavElementTypes.IMAGE_WITH_INTERNAL_LINK,
                height: 100,
                width: 100,
                url: 'https://placehold.co/400x400',
                link: {
                    route: 'home'
                }
            }
        ]
    },
    {
        elements: [
            {
                id: 'footer-title',
                type: NavElementTypes.TITLE,
                title: 'Test Title'
            },
            {
                id: 'footer-text',
                type: NavElementTypes.TEXT,
                paragraphs: [
                    // eslint-disable-next-line stylistic/max-len
                    'This is an example text for the ngx-mat-navigation-footer. This is an example text for the ngx-mat-navigation-footer. This is an example text for the ngx-mat-navigation-footer.'
                ]
            },
            {
                id: 'footer-custom',
                type: NavElementTypes.CUSTOM,
                component: CustomComponent,
                position: 'center'
            },
            {
                id: 'footer-title-right',
                type: NavElementTypes.TITLE,
                title: 'Test Title Right',
                position: 'right'
            }
        ]
    },
    {
        elements: [
            {
                id: 'footer-copyright',
                type: NavElementTypes.TITLE,
                title: 'Copyright',
                position: 'center'
            }
        ]
    }
];