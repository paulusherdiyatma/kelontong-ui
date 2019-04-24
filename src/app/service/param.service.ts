import { Injectable, Inject } from '@angular/core';
declare let _: any;

@Injectable()
export class ParamService {
    isAuthenticated = false;
    
    constructor(
       
    ) {

    }

    setToken(token) {
        localStorage.setItem('Token', token);
        this.isAuthenticated = true;
    }
    clearToken() {
        localStorage.removeItem('Token');
        this.isAuthenticated = false;
    }
}
