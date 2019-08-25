import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotUsedComponent } from './not-used.component';

const routes: Routes = [{ path: '', component: NotUsedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotUsedRoutingModule {}
