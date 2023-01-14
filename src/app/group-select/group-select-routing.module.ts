import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupSelectPage } from './group-select.page';

const routes: Routes = [
  {
    path: '',
    component: GroupSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupSelectPageRoutingModule {}
