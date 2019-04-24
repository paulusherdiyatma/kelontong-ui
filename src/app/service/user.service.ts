import { Injectable } from '@angular/core';
import { HttpUtilService } from './http-util.service';
import { Observable } from 'rxjs';
import { AppConfig } from '../shared/config/config';
import { User } from '../model/user';

@Injectable()
export class UserService {
    constructor(
        private httpUtilService: HttpUtilService
    ) {}

    getAllUser(queryParam: any): Observable<any> {
        return this.httpUtilService.httpGet(AppConfig.USER_URL, queryParam);
    }

    deleteUser(userId: any): Observable<any> {
        return this.httpUtilService.httpDelete(AppConfig.USER_URL, userId);
    }
    
    addUser(newUser: any): Observable<any> {
        return this.httpUtilService.httpPost(AppConfig.USER_URL, newUser);
    }

    updateUser(newUser: User): Observable<any> {
        return this.httpUtilService.httpPut(AppConfig.USER_URL, newUser);
    }

    login(user: any): Observable<any> {
        return this.httpUtilService.httpPost(`${AppConfig.USER_URL}/login`, user);
    }

    verify(): Observable<any> {
        return this.httpUtilService.httpGet(`${AppConfig.USER_URL}/verify`, null);
    }
}