import { NotUsedRoutingModule } from './not-used-routing.module';
import { NotUsedComponent } from './not-used.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, NotUsedRoutingModule],
  declarations: [NotUsedComponent]
})
export class NotUsedModule {}
