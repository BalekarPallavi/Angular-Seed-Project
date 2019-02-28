import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

@Component({
selector: 'app-error' ,
  templateUrl: 'pageNotFound.component.html',
  styleUrls: ['pageNotFound.component.css'],
  encapsulation: ViewEncapsulation.None

})

export class PagenotfoundComponent {

  constructor( private router: Router){

  }

  goBack() {
    this.router.navigate(['']);
  }
}
