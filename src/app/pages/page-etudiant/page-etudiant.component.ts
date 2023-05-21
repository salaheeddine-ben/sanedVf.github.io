import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService, EventSettingsModel, WorkHoursModel } from '@syncfusion/ej2-angular-schedule';
import { Internationalization } from '@syncfusion/ej2-base';
import { AuthService } from 'src/app/auth/auth.service';
import { EtudiantService } from 'src/app/layouts/espace-etudiant/etudiant.service';


@Component({
  selector: 'app-page-etudiant',
  templateUrl: './page-etudiant.component.html',
  styleUrls: ['./page-etudiant.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService]

})
export class PageEtudiantComponent {

  coursList: any[] = []


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
      StartTime: new Date(2023, 5, 17, 13, 0),
      EndTime: new Date(2023, 5, 17, 16, 0)
    },
  ];
 
  public selectedDate: Date = new Date();
  public allowVirtualScroll: boolean = true;
  public eventSettings: EventSettingsModel = {
    dataSource: this.data
  };

  public scheduleHours: WorkHoursModel  = { highlight: true, start: '13:00', end: '18:00' };


  constructor(private authservice: AuthService,private etudiantservice: EtudiantService,private router:Router) {

      this.etudiantservice.GetCours().subscribe(data => {
        this.coursList = data 
        console.log(this.coursList);
      });
    
    
  }


  
}
