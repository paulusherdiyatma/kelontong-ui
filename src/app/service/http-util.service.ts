import { Injectable, Inject } from "@angular/core";
import { HttpResponse, HttpClient, HttpRequest, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { HttpParamsOptions } from '@angular/common/http/src/params';


declare let _: any;
declare let newrelic: any;

@Injectable()
export class HttpUtilService {

    constructor(private http: HttpClient) {
        const options = {
            headers: this.setHeader()
        }
        this.http.options('', options);
    }

    setHeader() {
        const headers = new HttpHeaders();
        headers.set('Accept-Language', 'application/json');
        headers.set('Content-Type', 'application/json');
        return headers;
    }

    httpGet(url: string, queryParameter?: String): Observable<any> {
        if (queryParameter) {
            url = `${url}${queryParameter}`;
        }
        else {
            url = `${url}`;
        }

        // const headers = this.setHeader();
        return this.http.get(url);
    }

    httpPost(url: string, params?: any): Observable<any> {
        const headers = this.setHeader();
        return this.http.post(url, params);
    }

    httpPut(url: string, params?: any): Observable<any> {
        const headers = this.setHeader();
        return this.http.put(url, params);
    }

    httpDelete(url: string, param: any): Observable<any> {
        url = `${url}/${param}`;
        return this.http.delete(url);
    }
}
