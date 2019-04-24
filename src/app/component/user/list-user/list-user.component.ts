import { Component, OnInit, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { HttpUtilService } from '../../../service/http-util.service';
import { User } from '../../../model/user';
import { CustomAlertComponent } from '../../../shared/custom-alert/custom-alert.component';
import { UserPagination } from '../../../model/user-pagination';
import { UserService } from '../../../service/user.service';
import { APP_CONFIG, IAppConfig } from '../../../shared/config/config';

@Component({
  selector: 'list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  @ViewChild('customAlert') customAlert: CustomAlertComponent;
  @Output() editUser: EventEmitter<User> = new EventEmitter();
  @Output() addUser: EventEmitter<User> = new EventEmitter();
  isGettingUser: boolean;
  userList: UserPagination;
  lastPage = 1;
  isAdd: boolean;

  constructor(
    private httpService: HttpUtilService,
    private UserService: UserService,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) { }

  ngOnInit(): void {
    this.userList = new UserPagination();
    this.getListUser();
  }

  getListUser() {
    this.setIsGettingUser(true);

    let queryParam = `?pageNumber=${this.userList.number - 1}&pageSize=${this.userList.size}&sortBy=name&sortType=ASC`;
    this.UserService.getAllUser(queryParam).subscribe((response) => {
      this.mapResponse(response);
      this.setIsGettingUser(false);
    }, (error) => {
      this.setIsGettingUser(false);
    })
  }

  setIsGettingUser(isGetting: boolean) {
    this.isGettingUser = isGetting;
  }

  mapResponse(response) {
    this.userList = response;
    this.userList.number++;
  }

  delete(deletedUser: User) {
    this.customAlert.confirm(this.config.DELETE_USER_CONFIRMATION, (ok) => {
      this.UserService.deleteUser(deletedUser.id).subscribe((response) => {
        this.customAlert.popup(this.config.DELETE_USER_SUCCESS_INFO);
        this.getListUser();
      }, (error) => {})
    }, (no) => {})
  }

  edit(editedUser: User) {
    this.isAdd = true;
    this.editUser.emit(editedUser);
  }

  loadPage(pageNo) {
    if (this.lastPage != pageNo) {
      this.lastPage = JSON.parse(JSON.stringify(pageNo));
      this.userList.number = pageNo;
      this.getListUser();
    }
  }

  add() {
    this.isAdd = true;
    this.addUser.emit();
  }

  cancelAdd() {
    this.isAdd = false;
  }
}









