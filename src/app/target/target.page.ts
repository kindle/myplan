import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animation, Style } from '@capacitor/status-bar';
import { NavController, PickerController } from '@ionic/angular';
import { DataService } from '../data.service';
import { UiService } from '../ui.service';

@Component({
  selector: 'app-target',
  templateUrl: './target.page.html',
  styleUrls: ['./target.page.scss'],
})
export class TargetPage implements OnInit {

  constructor(
    private ui: UiService,
    public data: DataService,
    private nav: NavController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pickerCtrl: PickerController,
  ) { }

  ngOnInit() {}
  ionViewDidEnter(){}

  target = {
    id:0,//not set
    name:"",
    date:this.data.getLocalISOString(new Date()),
    //date:new Date(),
    days:0,//not set
    type:0,//not set
    groupId:0,//not set
    isTop:false,
    repeatUnit:0,//not set
    repeatType:0,//not set
  };
  ionViewWillEnter() {
    this.ui.setStatusBar(Style.Dark, Animation.Slide, "#3880ff");

//console.log(new Date())
    let targetId = this.activatedRoute.snapshot.queryParams["tid"];
    if(targetId!=null){//edit target
      this.target = this.data.getTarget(targetId);
      console.log(this.target)
    }
  }
  ionViewWillLeave() {
    this.ui.setStatusBar(Style.Light, Animation.Slide, "#ffffff");
  }

  
  selectGroup() {
    this.router.navigate(['/group-select'], {
      queryParams: { gid: this.data.globalCurrentTargetGroup.id }
    });
  }

  save() {
    if (this.target.name.length == 0) {
      this.ui.toast('middle', '请输入目标名称');
    }
    else {
      if(this.target.id==0){//new target
        this.data.addTarget(
          this.target.name, 
          this.target.date, 
          this.data.globalCurrentTargetGroup.id, //global var in dataservice
          this.target.isTop,
          this.target.repeatUnit,
          this.target.repeatType
        );
      }else{//edit target
        this.data.updateTarget(this.target);
      }


      //this.nav.back();
      this.router.navigate(['/tabs/tab1'], {});
      //if it's created from group list, it should go  to group

    }
  }

  delete(){
    this.ui.confirm("删除目标","确定要删除？",()=>{
      this.data.deleteTarget(this.target.id);
      this.router.navigate(['/tabs/tab1'], {});
    })
  } 

  async repeatPicker(){

    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'repeatnum',
          options: this.data.pickerNumOpts
        },
        {
          name: 'repeattype',
          options: this.data.pickerTypesOpts,
        },
      ],
      buttons: [
        {
          text: '选择重复类型'
        },
      ],
    });

    //load org value
    picker.columns[0].selectedIndex = this.target.repeatUnit;
    picker.columns[1].selectedIndex = this.target.repeatType;

    picker.addEventListener('ionPickerColChange', async event => {
      if(event['detail'].name=="repeatnum"){
        if(event['detail'].selectedIndex==0)
        {
          picker.columns[1].selectedIndex = 0;
          picker.columns = JSON.parse(JSON.stringify(picker.columns));
        }
        else{
          if(picker.columns[1].selectedIndex == 0){
            picker.columns[1].selectedIndex = 1;
            picker.columns = JSON.parse(JSON.stringify(picker.columns));
          }
        }
      }

      if(event['detail'].name=="repeattype")
      {
        if(event['detail'].selectedIndex==0)
        {
          picker.columns[0].selectedIndex = 0;
          picker.columns = JSON.parse(JSON.stringify(picker.columns));
        }
        else{
          if(picker.columns[0].selectedIndex == 0){
            picker.columns[0].selectedIndex = 1;
            picker.columns = JSON.parse(JSON.stringify(picker.columns));
          }
        }
      }

      this.target.repeatUnit = picker.columns[0].selectedIndex;
      this.target.repeatType = picker.columns[1].selectedIndex;
      console.log(this.target.repeatUnit+"_"+this.target.repeatType)

    });

    await picker.present();
  }

}
