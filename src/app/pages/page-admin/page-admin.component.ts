import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService, EventSettingsModel, WorkHoursModel } from '@syncfusion/ej2-angular-schedule';


// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.scss']
})
export class PageadminComponent implements OnInit {

 
  public clicked: boolean = true;
  public clicked1: boolean = false;


  public data: object[] = [
    {
      Id: 1,
      Subject: 'Meeting',
      StartTime: new Date(2023, 5, 16, 10, 0),
      EndTime: new Date(2023, 5, 16, 13, 30)
    },
    {
      Id: 2,
      Subject: 'Cours Math',
      StartTime: new Date(2023, 5, 16, 16, 0),
      EndTime: new Date(2023, 5, 16, 20, 0)
    },
  ];


  public selectedDate: Date = new Date();
  public allowVirtualScroll: boolean = true;
  public eventSettings: EventSettingsModel = {
    dataSource: this.data
  };

  public scheduleHours: WorkHoursModel  = { highlight: true, start: '11:00', end: '13:00' };


  ngOnInit() {}
  public updateOptions() {}

}
