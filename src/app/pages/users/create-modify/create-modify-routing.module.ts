import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateModifyPage } from './create-modify.page';

const routes: Routes = [
  {
    path: '',
    component: CreateModifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateModifyPageRoutingModule {}
