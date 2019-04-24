import { Component, ViewChild } from '@angular/core';
import { ListProductComponent } from './list-product/list-product.component';
import { Product } from '../../model/product';
import { ProductFormComponent } from './product-form/product-form.component';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @ViewChild('listProduct') listProduct: ListProductComponent;
  @ViewChild('productFormCom') productFormCom: ProductFormComponent;
  isAddEditProduct: boolean;

  refreshList() {
    this.listProduct.getListProduct();
  }

  editProduct(editedProduct: Product) {
    let me = this;
    me.isAddEditProduct = true;

    var setLoadEdit = setInterval(function(){ 
      if(me.productFormCom) {
        me.productFormCom.loadEditProduct(editedProduct);
          clearInterval(setLoadEdit);
      } 
  }, 10);
  }

  addProduct() {
    this.isAddEditProduct = true;
  }

  cancelAddEditProduct() {
    this.isAddEditProduct = false;
    this.productFormCom.ngOnInit();
    this.listProduct.isAdd = false;
  }
}
