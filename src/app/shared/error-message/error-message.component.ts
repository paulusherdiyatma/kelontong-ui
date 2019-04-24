import { Component, ViewChild, TemplateRef, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'error-message',
    templateUrl: './error-message.component.html',
    styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent {
    @Input() control: FormControl;

    ngOnInit() {
    }

    get errorMessage(): string {
        if (this.control) {
            for (let propertyName in this.control.errors) {
                if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                    return "Required"
                }
                return null;
            }
        } else {
            return null;
        }
    }

    getValidatorErrorMessage(validatorName:string, validatorValue?:any) {
        let config = {
            // 'required': 'required',
            // 'minlength': this.i18n.translate('minLength') + ' ' + ` ${validatorValue.requiredLength}`+ ' ' + this.i18n.translate('character'),
            // 'maxlength': this.i18n.translate('maxLength') + ' ' + ` ${validatorValue.requiredLength}`+ ' ' + this.i18n.translate('character'),
            // 'validateEmail': this.i18n.translate('email'),
            // 'validateWhitespace': this.i18n.translate('whitespace'),
            // 'validateNumber': this.i18n.translate('number'),
            // 'validateScpecialcharacter': this.i18n.translate('specialcharacter'),
            // 'validateExactlyLength': this.i18n.translate('exactlylength') + ' ' + ` ${validatorValue.validParam1}`,
            // 'validateRangeLength': this.i18n.translate('rangelength') + ' ' + ` ${validatorValue.validParam1}` +  ' ' + this.i18n.translate('and') + ' ' + ` ${validatorValue.validParam2}`,
            // 'validateAlphaNumericOnly': this.i18n.translate('alphaNumericOnly'),
            // 'validatePercentage': this.i18n.translate('percentageValid'),
            // 'validatePercentageMax100': this.i18n.translate('percentageInvalid'),
            // 'validatePercentageFull': this.i18n.translate('percentageInvalid'),
            // 'validateAmountReqExceeded': this.i18n.translate('maxAmountReqExceeded'),
            // 'validatePaymentAmtExceeded': this.i18n.translate('maxPaymentAmtExceeded'),
            // 'validateActualMinValue': this.i18n.translate('actualMinValue'),
            // 'validateActualMaxValue': this.i18n.translate('actualMaxValue'),
            // 'validateCardNumber': this.i18n.translate('cardNumberRequirement'),
            // 'validatePassword': this.i18n.translate('validatePassword'),
            // 'validateDash': this.i18n.translate('dash'),
            // 'validateEqNarrative': this.i18n.translate('eqNarrative'),
            // 'validateAge': this.i18n.translate('ageBetween') + ' ' + ` ${validatorValue.validParam1}` + ' ' + this.i18n.translate('and') + ' ' + ` ${validatorValue.validParam2}` + ' ' + this.i18n.translate('lblYear'),
            // 'validateCompanyName': this.i18n.translate('msgValidCompanyName'),
            // 'validateNotAllowed': this.i18n.translate('notAllowed'),
            // 'invalidFileType': 'Invalid file format (e.g. : jpg, png, pdf)',
            // 'invalidFileSize': 'File too large, max 300 KB',
            // 'validateBoolean': this.i18n.translate('invalidBoolean'),
            // 'maxValue': this.i18n.translate('maxValueValidation'),
            // 'minValue': this.i18n.translate('minValueValidation'),
            // 'minValueWithAmount': this.i18n.translate('minValueWithAmountValidation') + ' ' + ` ${validatorValue.validParam1}`,
            // 'pattern' : this.i18n.translate('formatNotMatch'),
        };

        return config[validatorName];
    }
}
