import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';

import {AlertService} from '../services/alert.service';
import {AuthenticationService} from '../services/authentication.service';
import get = Reflect.get;
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import {NGXLogger} from 'ngx-logger';
import {User} from '../_models';
import { SocialUser } from 'angularx-social-login';
import { NgZone, Injectable, Optional } from '@angular/core';
declare var gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  user: SocialUser;
 gapi: any;
  public auth2: any;
  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');
  // private FB: FacebookLoginProvider;
   constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private authService: AuthService,
    private logger: NGXLogger,
   ) {}


  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '36299278185-csd2f0ps24kh3oa0gp1vl4hbmjprv9lh.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: this.scope,
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        const profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        // YOUR CODE HERE


      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
  ngOnInit() {

    this.googleInit();

    this.authService.authState.subscribe((user) => {
      this.user = user;
    });

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // reset login status
    this.authenticationService.logout();

    // get retuen url from route parameter or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';


    }

     // convenience getter for easy access to form fields
    get f() {
      return this.loginForm.controls;
      console.log(this.loginForm.controls);
    }

//   submitLogin() {
//     console.log('submit login to facebook');
// // FB.login();
//     FB.login((response) => {
//       console.log('submitLogin', response);
//       if (response.authResponse) {
//         // login success
//         // login success code here
//         // redirect to home page
//       } else {
//         console.log('User login failed');
//       }
//     });
//
//   }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.loginForm.invalid) {
        return;
          }
      this.loading = true;
      this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
            this.logger.debug(error);
            // this.router.navigate(['/servererror']);
          });
    }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);

  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signInWithLinkedIn(): void {
    this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  onSignIn(user) {
    const profile = user.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  }

@Component({
  selector: 'app-mydemo',
  template: `{{title}}
    <!--<google-signin></google-signin>-->
    <footer>Angular version: {{angularVersion}}</footer>`
})
export class MyAppComponent {
  title     = 'Ajinkya\'s Google SignIn button';
  angularVersion = 'latest stable';
  constructor() { console.clear(); }
}

