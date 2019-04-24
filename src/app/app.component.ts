import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './service/user.service';
import { ParamService } from './service/param.service';
import { CustomAlertComponent } from './shared/custom-alert/custom-alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('customAlert') customAlert: CustomAlertComponent;
  ngOnInit(): void {
    this.checkToken();
  }

  constructor(private userService: UserService, private paramService: ParamService) { }

  checkToken() {
    this.userService.verify().subscribe((response) => {
      this.paramService.isAuthenticated = true;
    }, (error) => {
      if (error.status == 401) {
        this.paramService.isAuthenticated = false;
        localStorage.setItem('Token', null);
      }
    })
  }

  logout() {
    this.customAlert.confirm("Do you want to logout?", (ok) => {
      localStorage.setItem('Token', null);
      this.paramService.isAuthenticated = false;
  }, (cancel) => {
      // nothing to do
  })
  }
}
