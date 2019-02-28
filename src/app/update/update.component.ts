import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {AlertService} from '../services/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {User} from '../_models/user';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  // styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  loading = false;
  updateForm: FormGroup;
  private selectedUser: User[];
  user: User;
  u: any;
  private id: number;
  constructor(private userService: UserService, private formBuilder: FormBuilder,
              private alertService: AlertService, private route: ActivatedRoute,
              private router: Router, ) {
    this.updateForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      id: ''
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log(' id is :' + this.id);
    });
   console.log('g');
     this.selectedUser = this.userService.getSelectedUser();
         console.log('l');
        console.log(this.selectedUser);

        console.log('h');

      this.updateForm.controls['firstName'].patchValue(this.selectedUser['firstName']);
      this.updateForm.controls['lastName'].patchValue(this.selectedUser['lastName']);
      this.updateForm.controls['username'].patchValue(this.selectedUser['username']);
      this.updateForm.controls['password'].patchValue(this.selectedUser['password']);
    this.updateForm.controls['id'].patchValue(this.selectedUser['id']);

  }

   onSave() {
     const firstName: string = this.updateForm.controls['firstName'].value;
     const lastName: string = this.updateForm.controls['lastName'].value;
     const username: string = this.updateForm.controls['username'].value;
     const password: string = this.updateForm.controls['password'].value;
     const id: number = this.updateForm.controls['id'].value;
     // const user: User[] = new Array();
     const orderArray: User = new User();
     orderArray.firstName = firstName;
     orderArray.lastName = lastName;
     orderArray.username = username;
     orderArray.password = password;
     orderArray.id = id;
     // this.user.save(orderArray);
     // user.push(orderArray);
     console.log(orderArray);
    this.loading = true;
    this.userService.update(orderArray, this.id).subscribe(  data => {
        this.addUserDataSuccess(data);
        this.alertService.success('Data updated successfully !!');
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
     }

  addUserDataSuccess(result: any) {
    this.router.navigate(['']);
  }
}
