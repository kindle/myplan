import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TargetViewerPageRoutingModule } from './target-viewer-routing.module';

import { TargetViewerPage } from './target-viewer.page';
import { TargetViewComponentModule } from '../target-view/target-view.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TargetViewComponentModule,
    TargetViewerPageRoutingModule
  ],
  declarations: [TargetViewerPage]
})
export class TargetViewerPageModule {}
