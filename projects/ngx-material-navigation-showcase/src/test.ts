// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
// eslint-disable-next-line eslintImport/no-unassigned-import
import 'zone.js/testing';

declare const require: {
    context: (path: string, deep?: boolean, filter?: RegExp) => {
        <T>(id: string): T,
        keys: () => string[]
    }
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

// Then we find all the tests.
// eslint-disable-next-line typescript/typedef
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
// eslint-disable-next-line sonar/no-ignored-return
context.keys().map(context);