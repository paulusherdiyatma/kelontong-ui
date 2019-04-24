import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CustomAlertComponent } from './shared/custom-alert/custom-alert.component';
import { HttpUtilService } from './service/http-util.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_CONFIG, AppConfig } from './shared/config/config';
import { MoneyPipe } from './shared/pipe/money.pipe';
import { ErrorMessageComponent } from './shared/error-message/error-message.component';
import { ProductComponent } from './component/product/product.component';
import { ProductFormComponent } from './component/product/product-form/product-form.component';
import { ListProductComponent } from './component/product/list-product/list-product.component';
import { ProductService } from './service/product.service';
import { UserComponent } from './component/user/user.component';
import { UserFormComponent } from './component/user/user-form/user-form.component';
import { ListUserComponent } from './component/user/list-user/list-user.component';
import { UserService } from './service/user.service';
import { LoginComponent } from './component/user/login/login.component';
import { ParamService } from './service/param.service';
import { TokenInterceptor } from './shared/config/interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductFormComponent,
    ListProductComponent,
    CustomAlertComponent,
    MoneyPipe,
    ErrorMessageComponent,
    UserComponent,
    UserFormComponent,
    ListUserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpUtilService,
    ProductService,
    UserService,
    MoneyPipe,
    ParamService,
    { provide: APP_CONFIG, useValue: AppConfig },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }