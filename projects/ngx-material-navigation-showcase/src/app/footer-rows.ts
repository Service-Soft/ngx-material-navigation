import { FooterRow } from 'ngx-material-navigation';

export const footerRows: FooterRow[] = [
    {
        elements: [
            {
                type: 'imageWithInternalLink',
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
                type: 'title',
                title: 'Test Title'
            },
            {
                type: 'text',
                // eslint-disable-next-line max-len
                text: 'This is an example text for the ngx-mat-navigation-footer. This is an example text for the ngx-mat-navigation-footer. This is an example text for the ngx-mat-navigation-footer.'
            },
            {
                type: 'html',
                html: '<h1 style="color: red; text-align: center">Custom HTML</h1>',
                position: 'center'
            },
            {
                type: 'title',
                title: 'Test Title Right',
                position: 'right'
            }
        ]
    },
    {
        elements: [
            {
                type: 'title',
                title: 'Copyright',
                position: 'center'
            }
        ]
    }
];