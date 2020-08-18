import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    /*children: [
      { path: '', loadChildren: './principal/principal.module#PrincipalPageModule ' },
      { path: 'users', loadChildren: './pages/users/users.module#UsersPageModule' }
    ]*/
    loadChildren: () => import('./principal/principal.module').then( m => m.PrincipalPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersPageModule)
  }




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
