import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab5Page } from './tab5.page';

import { AuthGuardService } from '../auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: Tab5Page,
    //canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab5PageRoutingModule {}
