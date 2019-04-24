import { Injectable, InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken("config");

export interface IAppConfig {
    BASE_URL: string;
    PRODUCT_URL: string;
    USER_URL: string;
    DELETE_PRODUCT_CONFIRMATION: string;
    DELETE_PRODUCT_SUCCESS_INFO: string;
    DELETE_USER_CONFIRMATION: string;
    DELETE_USER_SUCCESS_INFO: string;
    SUBMIT_ADD_PRODUCT_CONFIRMATION: string;
    SUBMIT_EDIT_PRODUCT_CONFIRMATION: string;
    SUBMIT_ADD_USER_CONFIRMATION: string;
    SUBMIT_EDIT_USER_CONFIRMATION: string;
    MANDATORY_REQUIRED: string;
    SUBMIT_ADD_PRODUCT_SUCCESS_INFO: string;
    SUBMIT_EDIT_PRODUCT_SUCCESS_INFO: string;
    SUBMIT_ADD_USER_SUCCESS_INFO: string;
    SUBMIT_EDIT_USER_SUCCESS_INFO: string
    NAME: string;
    PRICE: string;
    ACTION: string;
    ADD_PRODUCT: string;
    ADD_USER: string;
}

export const AppConfig: IAppConfig = {
    BASE_URL: "https://kelontong-api.buildsoftware.dev",
    PRODUCT_URL: `https://kelontong-api.buildsoftware.dev/products`,
    USER_URL: `https://kelontong-api.buildsoftware.dev/users`,
    DELETE_PRODUCT_CONFIRMATION: "Do you want to delete this product?",
    DELETE_PRODUCT_SUCCESS_INFO: "The Product has been successfully deleted",
    DELETE_USER_CONFIRMATION: "Do you want to delete this user?",
    DELETE_USER_SUCCESS_INFO: "The user has been successfully deleted",
    SUBMIT_ADD_PRODUCT_CONFIRMATION: "Are you sure to submit this product?",
    SUBMIT_EDIT_PRODUCT_CONFIRMATION: "Are you sure to update this product?",
    SUBMIT_ADD_USER_CONFIRMATION: "Are you sure to submit this user?",
    SUBMIT_EDIT_USER_CONFIRMATION: "Are you sure to update this user?",
    MANDATORY_REQUIRED: "Please fill all mandatory fields",
    SUBMIT_ADD_PRODUCT_SUCCESS_INFO: "The Product has been successfully added",
    SUBMIT_EDIT_PRODUCT_SUCCESS_INFO: "The Product has been successfully edited",
    SUBMIT_ADD_USER_SUCCESS_INFO: "The user has been successfully added",
    SUBMIT_EDIT_USER_SUCCESS_INFO: "The user has been successfully edited",


    //global
    NAME: "Name",
    PRICE: "Price",
    ACTION: "Action",
    ADD_PRODUCT: "Add Product",
    ADD_USER: "Add User"
};

// @Injectable()
// export class AppConfig {
//     public static BASE_URL = "http://127.0.0.1:9006";
//     public static PRODUCT_URL = `${AppConfig.BASE_URL}/products`;
//     public static DELETE_PRODUCT_CONFIRMATION = "Do you want to delete this product?";
//     public static DELETE_PRODUCT_SUCCESS_INFO = "The Product has been successfully deleted";
//     public static SUBMIT_ADD_CONFIRMATION = "Are you sure to submit this product?";
//     public static SUBMIT_EDIT_CONFIRMATION = "Are you sure to update this product?";
//     public static MANDATORY_REQUIRED = "Please fill all mandatory fields";
//     public static SUBMIT_ADD_SUCCESS_INFO = "The Product has been successfully added";
//     public static SUBMIT_EDIT_SUCCESS_INFO = "The Product has been successfully edited";

//     // general
//     public static NAME = "Name";
//     public static PRICE = "Price";



// }





