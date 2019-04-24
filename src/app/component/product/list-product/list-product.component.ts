import { Component, OnInit, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { HttpUtilService } from '../../../service/http-util.service';
import { Product } from '../../../model/product';
import { CustomAlertComponent } from '../../../shared/custom-alert/custom-alert.component';
import { ProductPagination } from '../../../model/product-pagination';
import { ProductService } from '../../../service/product.service';
import { APP_CONFIG, IAppConfig } from '../../../shared/config/config';

@Component({
  selector: 'list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  @ViewChild('customAlert') customAlert: CustomAlertComponent;
  @Output() editProduct: EventEmitter<Product> = new EventEmitter();
  @Output() addProduct: EventEmitter<Product> = new EventEmitter();
  isGettingProduct: boolean;
  productList: ProductPagination;
  lastPage = 1;
  isAdd: boolean;

  constructor(
    private httpService: HttpUtilService,
    private ProductService: ProductService,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) { }

  ngOnInit(): void {
    this.productList = new ProductPagination();
    this.getListProduct();
  }

  getListProduct() {
    this.setIsGettingProduct(true);

    let queryParam = `?pageNumber=${this.productList.pageNumber}&pageSize=${this.productList.pageSize}&sortBy=name&sortType=ASC`;
    this.ProductService.getAllProduct(queryParam).subscribe((response) => {
      this.mapResponse(response);
      this.setIsGettingProduct(false);
    }, (error) => {
      this.setIsGettingProduct(false);
    })
  }

  setIsGettingProduct(isGetting: boolean) {
    this.isGettingProduct = isGetting;
  }

  mapResponse(response) {
    this.productList = response;
  }

  delete(deletedProduct: Product) {
    this.customAlert.confirm(this.config.DELETE_PRODUCT_CONFIRMATION, (ok) => {
      this.ProductService.deleteProduct(deletedProduct.id).subscribe((response) => {
        this.customAlert.popup(this.config.DELETE_PRODUCT_SUCCESS_INFO);
        this.getListProduct();
      }, (error) => {})
    }, (no) => {})
  }

  edit(editedProduct: Product) {
    this.isAdd = true;
    this.editProduct.emit(editedProduct);
  }

  loadPage(pageNo) {
    if (this.lastPage != pageNo) {
      this.lastPage = JSON.parse(JSON.stringify(pageNo));
      this.productList.pageNumber = pageNo;
      this.getListProduct();
    }
  }

  add() {
    this.isAdd = true;
    this.addProduct.emit();
  }

  cancelAdd() {
    this.isAdd = false;
  }
}









