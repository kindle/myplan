import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery'
import { DataService } from '../data.service';

@Component({
  selector: 'app-target-view',
  templateUrl: './target-view.component.html',
  styleUrls: ['./target-view.component.scss'],
})
export class TargetViewComponent implements OnInit {

  constructor(
    public data: DataService,
    private router: Router
  ) { }

  @Input() target;

  bigDays=[];

  ngOnInit() {
    this.generateBigDays();
  }

  private generateBigDays() {
    this.bigDays = this.bigDays.concat(this.data.getBigDays(this.target,100));
  }

  share(){
    this.router.navigate(['/share'], {
      queryParams: {tid:this.target.id}
    });
  }

  toggleFlip(){
    $("#flip-box"+this.target.id).toggleClass('flipped');
    $("#flip-menu-long").toggleClass('menu-long');
    $("#flip-menu-short").toggleClass('menu-short');
  }
}
