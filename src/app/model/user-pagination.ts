import { User } from './user';
import { Pageable } from './pageable';
import { Sort } from './sort';

export class UserPagination {
    content: Array<User> = [];
    pageable : Pageable;
    totalPages : Number;
    totalElements: Number;
    last: Boolean;
    size = 5;
    number = 1;
    numberOfElements: Number;
    sort: Sort
    first: boolean;
    empty: boolean;

    constructor(){
    };
}