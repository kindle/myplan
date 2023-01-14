import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private storage: Storage,
    private http: HttpClient,
  ) { 
    for(var i=1;i<=99;i++){
      this.pickerNumOpts.push({
        text: '每'+i,
        value: i,
      });
    };
  }

  /*--common start----*/
  get(key: string){
    return this.storage.get(key);
  }

  set(key: string, value){
    this.storage.set(key, value);
  }

  getTodayHistory(month){
    return this.http.get<any>(`assets/history/zh/${month}.json`).pipe().toPromise();
  }

  /*
  instant(key){
      if(this.localeData)
          return this.localeData[key];
      return key;
  }*/

  flatten (obj, prefix = [], current = {}) {
      if (typeof (obj) === 'object' && obj !== null) {
        Object.keys(obj).forEach(key => {
          this.flatten(obj[key], prefix.concat(key), current)
        })
      } else {
        current[prefix.join('.')] = obj
      }
    
      return current
  }

  getNewId(arr: Array<any>){
    if(arr==null||arr.length==0)
      return 0;
    return Math.max(...arr.map(t=>t.id))+1;
  }
  /*--common end----*/

  /*--Note start--*/
  LocalNotesKey="local_notes_key";
  saveNote(){
    this.set(this.LocalNotesKey, JSON.stringify(this.noteData));
  }

  noteData = [];
  getNote(noteId){
    let record = this.noteData.filter(t=>t.id==noteId);
    let result = {id:-1, date:new Date().getTime(),title:'',content:'',isTop:false};;
    if(record.length>0){
      Object.assign(result, record[0]);
    }
    
    return result;
  }
  addNote(date, title, content, isTop=false){
    let newId = this.getNewId(this.noteData);
    this.noteData.push({
      id:newId,
      date:date,
      title:title,
      content:content,
      isTop:isTop,
    });
    this.saveNote();
  }

  updateNote(note){
    let obj = this.noteData.filter(n=>n.id==note.id);
    
    if(obj.length>0){
      let orgNote = obj[0];
      if(orgNote.title!=note.title || orgNote.content!=note.content){
        orgNote.date = new Date().getTime();
      }
      orgNote.title = note.title;
      orgNote.content = note.content;
      orgNote.isTop = note.isTop;

      this.saveNote();
    }
  }

  deleteNote(nid){
    const noteIndex = this.noteData.findIndex((n) => n.id === nid);

    if (noteIndex > -1) {
      this.noteData.splice(noteIndex, 1);
      this.saveNote();
    }
  }
  /*--note start--*/

  /*--target start----*/
  targetType=[{id:0, name:"目标"},{id:1, name:"已完成"}];

  targetData = [];

  getTargets(groupId){
    return this.targetData.filter(t=>t.groupId==groupId);
  }

  getTarget(targetId){
    let result = this.targetData.filter(t=>t.id==targetId);

    return result.length>0?result[0]:null;
  }

  //calculate target days and type
  calcTargets(){
    this.targetData.forEach(e=>{
      let days = this.calcTargetDays(e);
      e.days = Math.abs(days);
      e.type = days<0 ? 1:0;
    })
    if(this.targetData!=null){
      this.targetData = this.targetData.sort((a,b)=>a.days-b.days);
      this.targetData = this.targetData.sort((a,b)=>a.type-b.type);
    }
  }

  resetTop(topId){
    this.targetData.forEach(e=>{
        e.isTop = e.id==topId?true:false;
    })
  }

  //date is tick since 1970-1-1 local time
  addTarget(name, date, groupId, isTop, rUnit, rType){
    let newId = this.getNewId(this.targetData);
    this.targetData.push({
      id:newId,
      name:name,
      date:date,
      days:0,
      type:0,
      groupId:groupId,
      isTop:isTop,
      repeatUnit:rUnit,
      repeatType:rType
    });
    if(isTop){
      this.resetTop(newId);
    }
    this.calculate();
  }

  updateTarget(target){
    let obj = this.targetData.filter(t=>t.id==target.id);
    if(obj.length>0){
      let orgTarget = obj[0];
      orgTarget.name = target.name;
      orgTarget.date = target.date;
      orgTarget.groupId = target.groupId;
      orgTarget.isTop = target.isTop;
      orgTarget.repeatUnit = target.repeatUnit;
      orgTarget.repeatType = target.repeatType;
    
      if(orgTarget.isTop){
        this.resetTop(orgTarget.id);
      }
      this.calculate();
    }
  }

  deleteTarget(tid){
    const targetIndex = this.targetData.findIndex((t) => t.id === tid);

    if (targetIndex > -1) {
      this.targetData.splice(targetIndex, 1);
      this.calculate();
    }
  }
  /*---targetend----*/

  /*----target repeat start----*/
  pickerNumOpts = [
    {text: '不重复',value: 0,},
  ];
  GetPickerNumText(i){
    if(i==undefined)
      return "";
    return this.pickerNumOpts.filter(n=>n.value==i)[0].text;
  }
  pickerTypesOpts = [
    {text: '不重复',value: 0,},
    {text: '周重复',value: 1,},
    {text: '月重复',value: 2,},
    {text: '年重复',value: 3,},
    {text: '天重复',value: 4,},
  ];
  GetPickerTypeText(i){
    if(i==undefined)
      return "";
    return this.pickerTypesOpts.filter(n=>n.value==i)[0].text;
  }
  /*----target repeat end----*/

  /*----group start--------------------------------------*/
  group = [];


  icons=[
    {name:"calendar-outline"},
    {name:"briefcase-outline"},
    {name:"rocket-outline"},
    {name:"fitness-outline"},
    {name:"fast-food-outline"},
    {name:"calendar-number-outline"},

    {name:"star-outline"},
    {name:"earth-outline"},
    {name:"musical-notes-outline"},
    {name:"diamond-outline"},
    {name:"cash-outline"},
    {name:"tv-outline"},
  ];

  proicons=[
    {name:"calendar-outline"},
    {name:"briefcase-outline"},
    {name:"rocket-outline"},
    {name:"fitness-outline"},
    {name:"fast-food-outline"},
    {name:"calendar-number-outline"},

    {name:"star-outline"},
    {name:"earth-outline"},
    {name:"musical-notes-outline"},
    {name:"diamond-outline"},
    {name:"cash-outline"},
    {name:"tv-outline"},
  ];

  covers=[
    {name:"cover1"},
    {name:"cover2"},
    {name:"cover3"},
  ];

  procovers=[
    {name:"cover1"},
    {name:"cover2"},
    {name:"cover3"},
    {name:"cover1"},
    {name:"cover2"},
    {name:"cover3"},
  ];

  getGroup(groupId){
    let result = this.group.filter(g=>g.id==groupId);
    return result.length>0?result[0]:null;
  }

  calGroup(){
    this.group.forEach(g=>{
      g.count = this.targetData.filter(t=>t.groupId==g.id).length;
    });
  }

  addGroup(newGroup){
    newGroup.id = this.getNewId(this.group);
    this.group.push(newGroup);
    this.calculate();
  }

  updateGroup(group){
    let obj = this.group.filter(g=>g.id==group.id);
    if(obj.length>0){
      let orgGroup = obj[0];
      orgGroup.name = group.name;
      orgGroup.icon = group.icon;
      orgGroup.cover = group.cover;
      //orgGroup.count = group.count;
      this.calculate();
    }
  }

  //todo
  deleteGroup(gid){
    const groupIndex = this.group.findIndex((g) => g.id === gid);

    if (groupIndex > -1) {
      this.group.splice(groupIndex, 1);
      this.calculate();
    }
  }

  setTop(group){
    const gIndex = this.group.findIndex(g => g.id == group.id);
    this.group.splice(gIndex, 1);
    this.group.unshift(group);
  }

  //for create new target only
  globalCurrentTargetGroup;
  /*---group end---------------------------------------*/

  /*--mix start----*/
  init(){
    this.load();
  }
  calculate(){
    this.calcTargets();
    this.calGroup();

    this.save();
  }
  LocalTargetKey="local_targets_key";
  LocalGroupKey="local_groups_key";
  save(){
    this.set(this.LocalTargetKey, JSON.stringify(this.targetData));
    this.set(this.LocalGroupKey, JSON.stringify(this.group));
  }
  load(){
    this.get(this.LocalNotesKey).then((value)=>{
      let previousNoteData = JSON.parse(value);
      this.noteData = previousNoteData==null?[]:previousNoteData;
    });
    this.get(this.LocalTargetKey).then((value)=>{
      this.targetData = JSON.parse(value);
      this.get(this.LocalGroupKey).then((value)=>{
        this.group = JSON.parse(value);

        //first time install
        if(this.targetData==null||this.targetData.length==0){
          this.initData();
        }

        this.globalCurrentTargetGroup = this.group[0];
        this.calculate();
      });
    });
    
  }
  getPercentage(){
    let all=0;
    let done=0;
    this.targetData.forEach(t=>{
      done += (t.type==1?1:0);
      all+=1;
    })

    return done/all;
  }
  /*--mix end----*/

  /*---testing only reset start------------------------------*/
  //!!!!!!!!
  clearData(){
    this.storage.clear();
  }
  //testing  only;
  initData(){
    //reset groups
    this.group = [
      {id:0, name: "生活", icon:"bag-outline", cover:"cover1", count:0},
      {id:1, name: "健康", icon:"barbell-outline", cover:"cover2", count:0},
      {id:2, name: "爱", icon:"fitness-outline", cover:"cover3", count:0},
      {id:3, name: "财富", icon:"diamond-outline", cover:"cover1", count:0},
      {id:4, name: "情感", icon:"pulse-outline", cover:"cover2", count:0},
      {id:5, name: "家庭", icon:"people-outline", cover:"cover3", count:0},
    ];
    //reset targets
    this.targetData =
    [
      {id:1, name:"发工资", date:"2022-12-15T09:00:00Z", days:0, type:1, groupId:3, isTop:false, repeatUnit:1, repeatType:2}, //还有
      {id:2, name:"妈妈生日", date:"1953-11-22T09:00:00Z", days:0, type:1, groupId:5, isTop:false, repeatUnit:1, repeatType:3},  //还有
      {id:3, name:"下个粉红日", date:"2022-12-23T09:00:22Z", days:0, type:1, groupId:0, isTop:false, repeatUnit:28, repeatType:4},  //还有  //粉红色 //周期  、、可以调整顺序
      {id:4, name:"开始攒钱", date:"2021-03-06T09:00:22Z", days:0, type:1, groupId:0, isTop:true, repeatUnit:0, repeatType:0}, //已经
      {id:5, name:"Google成立", date:"1998-09-04T09:00:22Z", days:0, groupId:0, type:1, isTop:false, repeatUnit:0, repeatType:0}, //已经
    ];
  }
  /*---testing only reset end------------------------------*/

  //------date tools start----------------------------------
  getLocalISOString(date){
    let year=date.getFullYear();
    if (year< 1900) year = year + 1900;
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let ms = date.getMilliseconds();

    let isoString=year + '-' + (month<10?'0':'') + month + 
    '-' +(day<10?'0':'') + day + 
    'T' + (hour<10?'0':'') + hour + 
    ':' + (minute<10?'0':'') + minute + 
    ':' + (second<10?'0':'') + second +
    '.' + (ms<10?'00':(ms<100?'0':'')) + ms +
    'Z';
    return isoString;
  }

  isTargetRepeat(target){
    return (target.repeatUnit != undefined && target.repeatUnit !=0)
  }

  //called from calcTargets()
  //calculate days from now until next target date.
  calcTargetDays(target){
    let now = this.getLocalISOString(new Date());
    let nowTick = new Date(now).getTime(); 
    
    let targetDate = new Date(target.date);
    if(this.isTargetRepeat(target)){
      targetDate = this.getNextTargetDate(target, nowTick);
    }
    target.targetDate = targetDate;

    let targetTick = new Date(targetDate).getTime();

    return this.getDays(targetTick, nowTick);
  }

  calcBigDays(targetDate){
    let now = this.getLocalISOString(new Date());
    let nowTick = new Date(now).getTime();

    let targetTick = new Date(targetDate).getTime();

    return this.getDays(targetTick, nowTick);
  }

  getDays(targetTick, nowTick){
    let seconds = Math.floor((targetTick-nowTick) / 1000);
    let days = Math.floor(seconds / (60 * 60 * 24)) + 1;

    return days;
  }

  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  getBigDays(target, count){
    let list = [0, 100, 200, 300, 365];
    let result = [];

    if(!this.isTargetRepeat(target)){
      list.forEach(days=>{
        let bigDate = this.addDays(target.date, days);
        result.push({name:days, date:this.getLocalISOString(bigDate), days:0});
      })
    }
    else{//is repeat
      let now = this.getLocalISOString(new Date());
      let nowTick = new Date(now).getTime();

      let startDate = new Date(target.date);
      let endDate = new Date(this.addDays(target.targetDate,100));

      let i=0;
      let bigDate = startDate;

      while(bigDate.getTime()<endDate.getTime()){
        let lastBigDateString = bigDate+"";
        bigDate = this.getRepeatDate(bigDate, target.repeatUnit, target.repeatType);

        if(bigDate.getTime()>=nowTick){
          let lastBigDate = lastBigDateString;
          let calcDays = this.calcBigDays(lastBigDate);
          if(calcDays>=0){
            result.push({name:i++, date:lastBigDate, days:calcDays});
          }
        }
      }
    }

    return result;
  }

  //from today.now on,
  //only for repeat target
  getNextTargetDate(target, nowTick){
    var newTargetDate = new Date(target.date);
    if(this.isTargetRepeat(target)){
      while(newTargetDate.getTime()<nowTick){
        newTargetDate = this.getRepeatDate(newTargetDate, target.repeatUnit, target.repeatType);
      }
    }
    return newTargetDate;
  }

  getRepeatDate(repeatDate, repeatUnit, repeatType){
    switch(repeatType){
      case 1:repeatDate.setDate(repeatDate.getDate() + 7*repeatUnit);break;//week
      case 2:repeatDate.setMonth(repeatDate.getMonth() + 1*repeatUnit);break;//month
      case 3:repeatDate.setFullYear(repeatDate.getFullYear() + 1*repeatUnit);break;//year
      case 4:repeatDate.setDate(repeatDate.getDate() + 1*repeatUnit);break;//day
      default:break;
    }
    return repeatDate;
  }

  getDatePipe(date, prefix='星期'){
    if(date!=null){
      date = date.replace("Monday", prefix+"一");
      date = date.replace("Tuesday", prefix+"二");
      date = date.replace("Wednesday", prefix+"三");
      date = date.replace("Thursday", prefix+"四");
      date = date.replace("Friday", prefix+"五");
      date = date.replace("Saturday", prefix+"六");
      date = date.replace("Sunday", prefix+"日");
    }
    return date;
  }
  //------date tools end----------------------------------
}
