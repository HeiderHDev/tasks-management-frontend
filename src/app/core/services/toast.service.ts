import { NgxToastService } from '@angular-magic/ngx-toast';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _ngxToastService = inject(NgxToastService);

  public success(title: string, message: string): void {
    this._ngxToastService.success({
      title,
      messages: [message],
      delay: 10000,
    });
  }

  public error(title: string, message: string): void {
    this._ngxToastService.error({
      title,
      messages: [message],
      delay: 10000,
    });
  }

  public warning(title: string, message: string): void {
    this._ngxToastService.warning({
      title,
      messages: [message],
      delay: 10000,
    });
  }

  public info(title: string, message: string): void {
    this._ngxToastService.info({
      title,
      messages: [message],
      delay: 10000,
    });
  }
}
