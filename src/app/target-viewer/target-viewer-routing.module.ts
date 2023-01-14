import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TargetViewerPage } from './target-viewer.page';

const routes: Routes = [
  {
    path: '',
    component: TargetViewerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TargetViewerPageRoutingModule {}
