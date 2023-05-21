import { Component } from '@angular/core';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService]

})
export class TimetableComponent {

  public data: object[] = [
    {
      Id: 1,
      Subject: 'Meeting',
      StartTime: new Date(2023, 1, 15, 10, 0),
      EndTime: new Date(2023, 1, 15, 12, 30)
    },
    {
      Id: 2,
      Subject: 'Cours Math',
      StartTime: new Date(2023, 1, 13, 1, 0),
      EndTime: new Date(2023, 1, 13, 3, 0)
    },
  ];
  public selectedDate: Date = new Date(2023 ,1, 15);
  public eventSettings: EventSettingsModel = {
    dataSource: this.data
  };
 

}
