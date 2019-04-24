import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomAlertComponent } from '../../../shared/custom-alert/custom-alert.component';
import { HttpUtilService } from '../../../service/http-util.service';
import { User } from '../../../model/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppConfig } from '../../../shared/config/config';
import { UserService } from '../../../service/user.service';
import { ParamService } from '../../../service/param.service';

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
    @ViewChild('customAlert') customAlert: CustomAlertComponent;
    @Output() refreshList: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    isSubmitBtnDisabled = false;
    isLoading = false;
    isNew = true;

    userForm: FormGroup;
    constructor(private userService: UserService, private paramService: ParamService) { }

    ngOnInit(): void {
        this.userForm = new FormGroup({
            id: new FormControl(null),
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            passwordConfirmation: new FormControl(null, Validators.required)
        });
    }

    showLoading(isLoading) {
        this.isLoading = isLoading;
    }
    submit() {
        if (this.userForm.valid) {

            if (this.userForm.getRawValue().password != this.userForm.getRawValue().passwordConfirmation) {
                this.customAlert.popup("Password confirmation is not match");
            }
            else {
                this.disableAllForm();
                this.showLoading(true);
                let newUser = new User();
                if (this.isNew) {
                    this.processAddUser(this.userForm.getRawValue());
                }
                else {
                    this.processEditUser(this.userForm.getRawValue());
                }
            }

        }
        else {
            this.markAsTouched();
            this.customAlert.popup(AppConfig.MANDATORY_REQUIRED);
        }
    }

    markAsTouched() {
        Object.keys(this.userForm.controls).forEach(key => {
            this.userForm.get(key).markAsTouched();
        })
    }



    processAddUser(newUser: User) {
        let registeredUser = {
            "user": {
              "email": newUser.email,
              "password": newUser.password
            }
          }
        this.userService.addUser(registeredUser).subscribe((response) => {
            this.enableAllForm();
            this.showLoading(false);
            this.userForm.reset();
            this.refreshList.emit();
            this.isNew = true;
            this.paramService.setToken(response.user.token);
            
        }, (error) => {
            this.customAlert.popup(error);
            this.showLoading(false);
            this.enableAllForm();
        })
    }

    processEditUser(newUser: User) {
        this.userService.updateUser(newUser).subscribe((response) => {
            this.enableAllForm();
            this.showLoading(false);
            this.userForm.reset();
            this.refreshList.emit();
            this.isNew = true;
            this.customAlert.popup(AppConfig.SUBMIT_EDIT_USER_SUCCESS_INFO);
        }, (error) => {
            this.customAlert.popup(error);
            this.showLoading(false);
            this.enableAllForm();
        })
    }

    disableAllForm() {
        this.userForm.disable();
        this.isSubmitBtnDisabled = true;
    }

    enableAllForm() {
        this.userForm.enable();
        this.isSubmitBtnDisabled = false;
    }

    loadEditUser(editedUser: User) {
        this.isNew = false;
        this.userForm.setValue(editedUser);
    }

    cancelAddEdit() {
        this.isNew = true;
        this.userForm.reset();
        this.cancel.emit();
    }
}
