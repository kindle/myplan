import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Animation, Style } from '@capacitor/status-bar';
import * as echarts from 'echarts';
import { DataService } from '../data.service';
import { UiService } from '../ui.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  today;
  constructor(
    private ui: UiService,
    private router: Router,
    private data: DataService,
  ) {
    this.today = new Date();
  }

  donePercentage = 0;

  //radar
  radarChart : echarts.ECharts;
  indicator=[];
  values=[];
  //bar
  barChart : echarts.ECharts;
  barNames = [];
  barValues = [];
  //pie
  pieInterval;
  pieChart : echarts.ECharts;
  pieNames =[];
  pieValues=[];

  ionViewWillLeave(){
    this.donePercentage =0;

    //radar
    this.radarChart.clear();
    this.indicator=[];
    this.values=[];
    //bar
    this.barChart.clear();
    this.barNames = [];
    this.barValues = [];
    //pie
    clearInterval(this.pieInterval);
    this.pieChart.clear();
    this.pieNames =[];
    this.pieValues=[];
  }

  ionViewWillEnter() {
    this.ui.setStatusBar(Style.Light,Animation.Slide,"#ffffff");

    this.donePercentage = this.data.getPercentage();

    

    this.data.calGroup();
    let groupMaxTargetCount = Math.max(...this.data.group.map(g=>g.count));
    this.data.group.forEach(g=>{
      this.indicator.push({name:g.name, min:0, max:6});
      let value = groupMaxTargetCount==0? 1: 6*g.count/groupMaxTargetCount;
      this.values.push(value<0.5?0.5:value);

      this.barNames.push(g.name);
      this.barValues.push(g.count);

      this.pieNames.push(g.name);
      this.pieValues.push({value:g.count,name:g.name});
    })
    


    let chartOption = {
      color: '#EC4137',
      legend: {},
      radar: {
        shape: 'circle',
        startAngle: 120,
        indicator: this.indicator,
        radius: 120,
        axisName: {
          color: '#000',
          backgroundColor: 'transparent',
          borderRadius: 3,
          padding: [3, 5]
        },
        
      },
      series: [
        {
          type: 'radar',
          symbol: 'none',//'rect',
          symbolSize: 12,
          lineStyle: {
            type: 'solid'
          },
          data: [
            {
              value: this.values,//[4.5, 5, 4, 5, 5.5, 5],
              areaStyle: {
                color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                  {
                    color: 'rgba(255, 145, 124, 0.3)',
                    offset: 0
                  },
                  {
                    color: 'rgba(255, 145, 124, 0.9)',
                    offset: 1
                  }
                ])
              }
            },
          ]
        }
      ]
    };


    this.radarChart = echarts.init(document.getElementById('radar'));
    this.radarChart.setOption(chartOption);
    this.radarChart.on('click', (params)=> {
      this.goGroupViewer(params.name);
    });
    this.radarChart.on('click', 'series', ()=> {console.log('sss')});

    ///////////////////////////////////////////////////////////
    this.barChart = echarts.init(document.getElementById('bar'));
    var option = {
      xAxis: {
        data: this.barNames
      },
      yAxis: {},
      series: [
        {
          name: '',
          type: 'bar',
          data: this.barValues
        }
      ]
    };
    this.barChart.setOption(option);
    this.barChart.on('click', (params)=> {
      this.goGroupViewer(params.name);
    });
    this.barChart.on('click', 'dataZoom',  (params)=> {
      console.log(params)
    });

    ///////////////////////////////////////////////////////////
    this.pieChart = echarts.init(document.getElementById('pie'));

    let pieOption = {
      title: {
        text: '',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: this.pieNames
      },
      series: [
        {
          name: '分组',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: this.pieValues,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    this.pieChart.setOption(pieOption);
    let currentIndex = -1;
    
    this.pieInterval = setInterval(()=> {
      var dataLen = pieOption.series[0].data.length;
      this.pieChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: currentIndex
      });
      currentIndex = (currentIndex + 1) % dataLen;
      this.pieChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: currentIndex
      });
      this.pieChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: currentIndex
      });
    }, 2000);
  }

  goGroupViewer(groupName){
    let result = this.data.group.filter(g=>g.name === groupName)[0];
    this.router.navigate(['/group-viewer'], {
      queryParams: {gid:result.id}
    });
  }
}
