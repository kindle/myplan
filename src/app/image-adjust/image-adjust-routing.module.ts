import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageAdjustPage } from './image-adjust.page';

const routes: Routes = [
  {
    path: '',
    component: ImageAdjustPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageAdjustPageRoutingModule {}
