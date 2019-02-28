import {Component, ViewEncapsulation} from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-errors',
  templateUrl: '500.component.html',
  styleUrls: ['500.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ServerErrorComponent {
  constructor( private router: Router){

  }
  goBack() {
    this.router.navigate(['']);
  }
}
