import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cour } from 'src/app/models/cour';
import { Groupe } from 'src/app/models/groupe';


const BaseUrl = "http://172.20.10.6:8050";


@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(private http: HttpClient) { }


  public GetCours() {
    return this.http.get<any>(`${BaseUrl}/api/students/cours/`);
  }
  public GetProfs() {
    return this.http.get<any>(`${BaseUrl}/api/courses/`);
  }
  public Getgroupes() {
    return this.http.get<any>(`${BaseUrl}/api/courses/`);
  }
  public rejoindreGroupe(groupid:any) {
    return this.http.post<any>(`${BaseUrl}/api/students/enroll`,{groupid:groupid});
  }

  rejoindreClasse(courseId: number){
    return this.http.get<any>(`${BaseUrl}/api/courses/join/${courseId}`);
  }


  getLessonPlan(){
    return null
  }
  getAttachments(){
    return null
  }
  getStudents(){
    return null
  }
  askQuestion(hey :any){
    console.log(hey);
  }



}
