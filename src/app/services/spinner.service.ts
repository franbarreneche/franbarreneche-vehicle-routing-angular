import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private spinner: NgxSpinnerService) { }

  showLoading() {
    this.spinner.show();
  }

  hideLoading() {
    this.spinner.hide();
  }
}
