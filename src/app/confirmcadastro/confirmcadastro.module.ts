import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmcadastroPageRoutingModule } from './confirmcadastro-routing.module';

import { ConfirmcadastroPage } from './confirmcadastro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmcadastroPageRoutingModule
  ],
  declarations: [ConfirmcadastroPage]
})
export class ConfirmcadastroPageModule {}
