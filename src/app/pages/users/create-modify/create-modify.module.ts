import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateModifyPageRoutingModule } from './create-modify-routing.module';

import { CreateModifyPage } from './create-modify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateModifyPageRoutingModule
  ],
  declarations: [CreateModifyPage]
})
export class CreateModifyPageModule {}
