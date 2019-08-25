import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import {
  ExtraOptions,
  RouterModule,
  Routes,
  Route,
  PreloadingStrategy
} from '@angular/router';
import { Observable, of } from 'rxjs';

export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    return route.data && route.data['preload'] ? load() : of(null);
  }
}

export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
  preloadingStrategy: CustomPreloadingStrategy
};

export const APP_ROUTES_MODULE_PROVIDER = [CustomPreloadingStrategy];

const routes: Routes = [
  {
    path: 'not-used',
    loadChildren: './views/not-used/not-used.module#NotUsedModule'
  },
  {
    path: ':orgId',
    loadChildren: './views/used/used.module#UsedModule'
  },
  {
    path: '',
    component: AppComponent
    // loadChildren: './views/used/used.module#UsedModule'
  }
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./views/shared-users/shared-users.module').then(
  //       module => module.SharedUsersModule
  //     )
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule],
  providers: [...APP_ROUTES_MODULE_PROVIDER]
})
export class AppRoutingModule {}
