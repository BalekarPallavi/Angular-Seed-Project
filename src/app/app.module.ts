import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule, routing} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent, MyAppComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {fakeBackendProvider} from './_helpers/fake-backend';
import {AlertService} from './services/alert.service';
import {AuthenticationService} from './services/authentication.service';
import {UserService} from './services/user.service';
import {AuthGuard} from './_guards';
import {AlertComponent} from './_directives/alert.component';
import {CommonModule} from '@angular/common';
import {UpdateComponent} from './update/update.component';
import {AuthServiceConfig,  FacebookLoginProvider,
  GoogleLoginProvider,  LinkedInLoginProvider,  SocialLoginModule} from 'angularx-social-login';
import {PagenotfoundComponent} from './ErrorPagez/pagenotfound.component';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {ServerErrorComponent} from './ErrorPagez/500.component';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('257228945317-s5ojopj1ne6tp6sd8vb6v154jn5fn8n6.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('380618849429488')
  },
  {
    id: LinkedInLoginProvider.PROVIDER_ID,
    provider: new LinkedInLoginProvider('LinkedIn-client-Id', false, 'en_US')
  }
]);

export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AlertComponent,
    UpdateComponent,
    PagenotfoundComponent,
    ServerErrorComponent,
  MyAppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    CommonModule,
    SocialLoginModule,
    LoggerModule.forRoot({ level: NgxLoggerLevel.DEBUG ,}),
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ] ,

  bootstrap: [AppComponent]
})

export class AppModule {

}
