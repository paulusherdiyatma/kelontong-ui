import { Component, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'custom-alert',
    templateUrl: './custom-alert.component.html',
    styleUrls: ['./custom-alert.component.css']
})
export class CustomAlertComponent {
    @ViewChild('confirmContent') confirmContent:any;
    @ViewChild('popupContent') popupContent:any;

    shown: boolean;
    constructor(private modalService: NgbModal) { }
    callBackOk : any;
    callbackCancel: any;
    message = "";

    confirm(message: string = "", callBackOk: any = null, callBackCancel: any = null) {
        this.message = message;
        this.callBackOk = callBackOk;
        this.callbackCancel = callBackCancel;
        this.modalService.open(this.confirmContent, { centered: true });
    }

    popup(message: string = "", callBackOk: any = null) {
        this.message = message;
        this.callBackOk = callBackOk;
        this.modalService.open(this.popupContent, { centered: true });
    }

    cancel() {
        if(this.callbackCancel) this.callbackCancel('cancel');
        this.modalService.dismissAll();
    }

    submitConfirmation() {
        if(this.callBackOk) this.callBackOk('ok');
        this.modalService.dismissAll();
    }

    ok() {
        if(this.callBackOk) this.callBackOk('ok');
        this.modalService.dismissAll();
    }
}
