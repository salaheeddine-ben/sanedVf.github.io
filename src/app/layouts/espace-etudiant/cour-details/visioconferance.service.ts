import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';


// const ngrokurl = "https://e818-197-206-206-18.ngrok-free.app";
const BaseUrl = "http://172.20.10.6:8050";
const meetingId = "6451f268280176c1a9e604fe"


@Injectable({
  providedIn: 'root'
})
export class VisioconferanceService {


  constructor(private http: HttpClient) { 
  }

  public joinMeeting(coursId:any) {
    return this.http.get<any>(`${BaseUrl}/api/courses/join/${coursId}`);
  }
  public startMeeting(coursId:any) {
    return this.http.get(`${BaseUrl}/api/courses/start/${coursId}`);
  }
  public getProfGroupes() {
    return this.http.get(`${BaseUrl}/api/teachers/groups/`);
  }
  public getCour() {
    return this.http.get(`${BaseUrl}/api/cour/:id/`);
  }

}
