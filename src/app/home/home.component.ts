import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../services/user.service';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../services/alert.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  update = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder,
              private alertService: AlertService, private route: ActivatedRoute,
              private router: Router, ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllUsers();

  }

  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
      this.loadAllUsers();
    });
  }

  private loadAllUsers() {

    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });

  }

   updateUser(u) {
    console.log(u);
     this.userService.setSelectedUser(u);
     console.log(' hi ');
     this.router.navigate(['/user/' + u.id + '/update']);
     console.log('g');
 }

}
