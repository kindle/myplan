import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupViewerPage } from './group-viewer.page';

const routes: Routes = [
  {
    path: '',
    component: GroupViewerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupViewerPageRoutingModule {}
