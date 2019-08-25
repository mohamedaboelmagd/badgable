import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsedComponent } from './used.component';
import * as fromContainers from './containers';

const routes: Routes = [
  {
    path: 'add',
    component: fromContainers.AddBadgeComponent
  },
  {
    path: ':badgeId/edit',
    component: fromContainers.EditBadgeComponent
  },
  {
    path: ':badgeId/logs',
    component: fromContainers.LogBadgeComponent
  },
  {
    path: ':badgeId/add',
    component: fromContainers.AddAwardComponent
  },
  {
    path: ':badgeId',
    component: fromContainers.ShowAwardsComponent
  },
  { path: '', component: UsedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsedRoutingModule {}
