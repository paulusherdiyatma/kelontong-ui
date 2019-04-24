import { Injectable } from '@angular/core';
import { HttpUtilService } from './http-util.service';
import { Observable } from 'rxjs';
import { AppConfig } from '../shared/config/config';
import { Product } from '../model/product';

@Injectable()
export class ProductService {
    constructor(
        private httpUtilService: HttpUtilService
    ) {}

    getAllProduct(queryParam: any): Observable<any> {
        return this.httpUtilService.httpGet(AppConfig.PRODUCT_URL, queryParam);
    }

    deleteProduct(productId: any): Observable<any> {
        return this.httpUtilService.httpDelete(AppConfig.PRODUCT_URL, productId);
    }
    
    addProduct(newProduct: Product): Observable<any> {
        return this.httpUtilService.httpPost(AppConfig.PRODUCT_URL, newProduct);
    }

    updateProduct(newProduct: Product): Observable<any> {
        return this.httpUtilService.httpPut(AppConfig.PRODUCT_URL, newProduct);
    }
}