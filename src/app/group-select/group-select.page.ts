import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from '../data.service';

@Component({
  selector: 'app-group-select',
  templateUrl: './group-select.page.html',
  styleUrls: ['./group-select.page.scss'],
})
export class GroupSelectPage implements OnInit {

  constructor(
    public data:DataService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private nav: NavController,
  ) { }

  ngOnInit() {
  }

  selectedGroupId;
  ionViewDidEnter(){
    this.selectedGroupId = this.activatedRoute.snapshot.queryParams["gid"];
  }

  addGroup(){
    this.router.navigate(['/group'], {
      queryParams: {}
    });
  }

  selectGroup(group){
    this.selectedGroupId = group.id;
    this.data.globalCurrentTargetGroup = group;

    console.log(this.data.globalCurrentTargetGroup);
    this.nav.back();
  }

}
