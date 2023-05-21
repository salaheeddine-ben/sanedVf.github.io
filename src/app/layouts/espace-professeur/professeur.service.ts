import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cour } from 'src/app/models/cour';
import { Groupe } from 'src/app/models/groupe';


const BaseUrl = "http://172.20.10.6:8050";
const BaseUrl2 = "http://172.20.10.6:8080";


@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {

  constructor(private http: HttpClient) { 
  }

  public CreateGroupe(groupe : any) {
    console.log("dorka hna");
    return this.http.post<any>(`${BaseUrl}/api/teachers/groups/create`,groupe);
  }
  public CreateCour(cour : FormData) {
    return this.http.post<any>(`${BaseUrl}/api/courses/create/`,cour);
  }
  public GetCours() {
    return this.http.get<any>(`${BaseUrl}/api/courses/`);
  }
  public GetGroupes() {
    return this.http.get<any>(`${BaseUrl}/api/teachers/groups/`);
  }
  public GetDemandes() {
    return this.http.get<any>(`${BaseUrl}/api/teachers/enrollements/`);
  }
  public acctepterdemande(demandeid:any) {
    return this.http.post<any>(`${BaseUrl}/api/teachers/accept/`,{enrollementid:demandeid});
  }


 rejoindreClasse(courseId: number){
    return this.http.get<any>(`${BaseUrl}/api/courses/start/${courseId}`);
  }




  // explore page
  public Getglobaleprof() {
    return this.http.get<any>(`${BaseUrl}/api/explore/teachers/`);
  }
  public GetglobaleprofDetails(id:number) {
    return this.http.get<any>(`${BaseUrl}/api/explore/teacher?id=${id}`);
  }
  

}
