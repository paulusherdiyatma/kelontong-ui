import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomAlertComponent } from '../../../shared/custom-alert/custom-alert.component';
import { HttpUtilService } from '../../../service/http-util.service';
import { User } from '../../../model/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppConfig } from '../../../shared/config/config';
import { UserService } from '../../../service/user.service';
import { ParamService } from '../../../service/param.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    @ViewChild('customAlert') customAlert: CustomAlertComponent;
    isSubmitBtnDisabled = false;
    isLoading = false;
    
    loginForm: FormGroup;
    constructor(private userService: UserService, private paramService: ParamService) { }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    showLoading(isLoading) {
        this.isLoading = isLoading;
    }

    login() {
        if (this.loginForm.valid) {
            this.disableAllForm();
            this.showLoading(true);
            this.userService.login({user:this.loginForm.getRawValue()}).subscribe((response) => {
                this.enableAllForm();
                this.showLoading(false);
                if(response && response.user) {
                    this.paramService.setToken(response.user.token);
                }
                else {
                    this.paramService.clearToken();
                }
            }, (error) => {
                this.customAlert.popup(error);
                this.showLoading(false);
                this.enableAllForm();
                this.paramService.clearToken();
            })
        }
        else {
            this.markAsTouched();
            this.customAlert.popup(AppConfig.MANDATORY_REQUIRED);
        }
    }

    markAsTouched() {
        Object.keys(this.loginForm.controls).forEach(key => {
            this.loginForm.get(key).markAsTouched();
        })
    }

    disableAllForm() {
        this.loginForm.disable();
        this.isSubmitBtnDisabled = true;
    }

    enableAllForm() {
        this.loginForm.enable();
        this.isSubmitBtnDisabled = false;
    }
}
