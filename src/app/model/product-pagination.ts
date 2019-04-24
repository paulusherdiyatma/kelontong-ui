import { Product } from './product';
import { Pageable } from './pageable';
import { Sort } from './sort';

export class ProductPagination {
    products: Array<Product> = [];
    total: Number;
    pageNumber: any = 1;
    pageSize: any = 5;
    sortBy: String;
    sortType: any;

    constructor(){
    };
}