import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageAdjustPageRoutingModule } from './image-adjust-routing.module';

import { ImageAdjustPage } from './image-adjust.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageAdjustPageRoutingModule,
  ],
  declarations: [ImageAdjustPage]
})
export class ImageAdjustPageModule {}
