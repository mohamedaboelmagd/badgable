import { UploaderModule } from './../uploader/uploader.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsedRoutingModule } from './used-routing.module';
import { UsedComponent } from './used.component';
import * as fromContainers from './containers';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    UsedRoutingModule,
    UploaderModule,
    ReactiveFormsModule
  ],
  declarations: [UsedComponent, ...fromContainers.CONTAINERS]
})
export class UsedModule {}
