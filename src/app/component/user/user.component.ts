import { Component, ViewChild } from '@angular/core';
import { ListUserComponent } from './list-user/list-user.component';
import { User } from '../../model/user';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @ViewChild('listUser') listUser: ListUserComponent;
  @ViewChild('userForm') userForm: UserFormComponent;
  isRegister: boolean;

  refreshList() {
    this.listUser.getListUser();
  }

  // editUser(editedUser: User) {
  //   this.isAddEditUser = true;
  //   this.userForm.loadEditUser(editedUser);
  // }

  addUser() {
    this.isRegister = true;
  }

  cancelAddEditUser() {
    this.isRegister = false;
    this.userForm.ngOnInit();
    this.listUser.isAdd = false;
  }
}
