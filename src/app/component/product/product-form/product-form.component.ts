import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomAlertComponent } from '../../../shared/custom-alert/custom-alert.component';
import { HttpUtilService } from '../../../service/http-util.service';
import { Product } from '../../../model/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppConfig } from '../../../shared/config/config';
import { ProductService } from '../../../service/product.service';

@Component({
    selector: 'product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
    @ViewChild('customAlert') customAlert: CustomAlertComponent;
    @Output() refreshList: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    isSubmitBtnDisabled = false;
    isLoading = false;
    isNew = true;

    productForm: FormGroup;
    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.productForm = new FormGroup({
            id: new FormControl(null),
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            price: new FormControl(null, Validators.required)
        });
    }
    
    showLoading(isLoading) {
        this.isLoading = isLoading;
    }
    submit() {
        if (this.productForm.valid) {
            let message = this.isNew ? AppConfig.SUBMIT_ADD_PRODUCT_CONFIRMATION : AppConfig.SUBMIT_EDIT_PRODUCT_CONFIRMATION;
            this.customAlert.confirm(message, (ok) => {
                this.disableAllForm();
                this.showLoading(true);
                let newProduct = new Product();
                if (this.isNew) {
                    this.processAddProduct(this.productForm.getRawValue());
                }
                else {
                    this.processEditProduct(this.productForm.getRawValue());
                }
            }, (cancel) => {
                // nothing to do
            })
        }
        else {
            this.markAsTouched();
            this.customAlert.popup(AppConfig.MANDATORY_REQUIRED);
        }
    }

    markAsTouched() {
        Object.keys(this.productForm.controls).forEach(key => {
            this.productForm.get(key).markAsTouched();
          })
    }



    processAddProduct(newProduct: Product) {
        this.productService.addProduct(newProduct).subscribe((response) => {
            this.enableAllForm();
            this.showLoading(false);
            this.productForm.reset();
            this.refreshList.emit();
            this.isNew = true;
            this.cancelAddEdit();
            this.customAlert.popup(AppConfig.SUBMIT_ADD_PRODUCT_SUCCESS_INFO);
        }, (error) => {
            this.customAlert.popup(error);
            this.showLoading(false);
            this.enableAllForm();
        })
    }

    processEditProduct(newProduct: Product) {
        this.productService.updateProduct(newProduct).subscribe((response) => {
            this.enableAllForm();
            this.showLoading(false);
            this.productForm.reset();
            this.refreshList.emit();
            this.isNew = false;
            this.cancelAddEdit();
            this.customAlert.popup(AppConfig.SUBMIT_EDIT_PRODUCT_SUCCESS_INFO);
        }, (error) => {
            this.customAlert.popup(error);
            this.showLoading(false);
            this.enableAllForm();
        })
    }

    disableAllForm() {
        this.productForm.disable();
        this.isSubmitBtnDisabled = true;
    }

    enableAllForm() {
        this.productForm.enable();
        this.isSubmitBtnDisabled = false;
    }

    loadEditProduct(editedProduct: Product) {
        this.isNew = false;
        this.productForm.setValue(editedProduct);
    }

    cancelAddEdit() {
        this.isNew = true;
        this.productForm.reset();
        this.cancel.emit();
    }
}
