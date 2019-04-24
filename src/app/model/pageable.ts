import { Sort } from './sort';

export class Pageable {
    sort : Sort;
    offset : Number;
    pageSize : Number;
    pageNumber : Number;
    paged: boolean;
    unpaged: boolean;
    constructor(){};
}