import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupViewerPageRoutingModule } from './group-viewer-routing.module';

import { GroupViewerPage } from './group-viewer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupViewerPageRoutingModule
  ],
  declarations: [GroupViewerPage]
})
export class GroupViewerPageModule {}
