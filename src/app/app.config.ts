import {ApplicationConfig, InjectionToken} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {ApiInterceptor} from "./core/interceptors/api.interceptor";
import { provideAnimations } from '@angular/platform-browser/animations';

export const BACKEND_URL = new InjectionToken<string>('BACKEND_URL');
export const BACKEND_API_KEY = new InjectionToken<string>('BACKEND_API_KEY');

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: BACKEND_URL, useValue: '<BAKCKEND_URL>' },
    { provide: BACKEND_API_KEY, useValue: '<BAKCKEND_API_KEY>'},
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations()
]
};
