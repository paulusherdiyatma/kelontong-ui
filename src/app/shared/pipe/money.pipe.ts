import {Pipe, PipeTransform} from '@angular/core';
import { formatNumber } from 'accounting';

@Pipe({name: 'money'})
export class MoneyPipe implements PipeTransform {
    constructor() {
    }

    transform(value) {
        return formatNumber(value);
    }
}
