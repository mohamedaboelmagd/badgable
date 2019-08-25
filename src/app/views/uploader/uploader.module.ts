import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatProgressBarModule,
  MatProgressSpinnerModule
} from '@angular/material';

import * as fromComponents from './components';
import * as fromServices from './services';

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule],
  providers: [...fromServices.SERVICES],
  declarations: [...fromComponents.COMPONENTS],
  exports: [...fromComponents.COMPONENTS]
})
export class UploaderModule {}
