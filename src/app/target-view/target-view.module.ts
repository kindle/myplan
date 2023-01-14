import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TargetViewComponent } from './target-view.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [TargetViewComponent],
  exports: [TargetViewComponent]
})
export class TargetViewComponentModule {}
