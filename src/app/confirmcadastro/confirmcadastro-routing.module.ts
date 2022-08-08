import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmcadastroPage } from './confirmcadastro.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmcadastroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmcadastroPageRoutingModule {}
