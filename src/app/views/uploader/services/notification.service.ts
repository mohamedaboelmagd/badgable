import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _defaultConfig: MatSnackBarConfig = {
    duration: 2000
  };
  constructor(private snackBar: MatSnackBar) {}

  public notify(
    message: string,
    action: string,
    config: MatSnackBarConfig = this._defaultConfig
  ) {
    this.snackBar.open(message, action, config);
  }

  public translate(
    message: string,
    action: string,
    config: MatSnackBarConfig = this._defaultConfig
  ) {
    this.snackBar.open(message, action, config);
  }

  public close() {
    this.snackBar.dismiss();
  }
}
