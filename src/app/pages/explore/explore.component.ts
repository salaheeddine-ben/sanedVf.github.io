import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EtudiantService } from 'src/app/layouts/espace-etudiant/etudiant.service';
import { ProfesseurService } from 'src/app/layouts/espace-professeur/professeur.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent {

  populars:any[]=["Math","Physique","Science","Arabe","Français","Anglais"]

  profList: any[] = []


  constructor(private etudiantservice:EtudiantService,private profservice :ProfesseurService, private authservice: AuthService) {

  this.profservice.Getglobaleprof().subscribe(data => {
    this.profList = data 
    console.log(this.profList);

    
  });

}

getTotalNumberOfCourses(prof: any): number {
  let total = 0;
  for (const group of prof.groups) {
    total += group.courses.length;
  }
  return total;
}
getTotalNumberOfStudents(prof: any): number {
  let total = 0;
  for (const group of prof.groups) {
    total += group.students.length;
  }
  return total;
}


}
