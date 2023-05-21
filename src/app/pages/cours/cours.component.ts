import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { EtudiantService } from 'src/app/layouts/espace-etudiant/etudiant.service';
import { ProfesseurService } from 'src/app/layouts/espace-professeur/professeur.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent {

  coursList: any[] = []
  filteredCoursList: any[] = []
  selectedMatiere: string | null = null;
  selectedStatus: string | null = null;
  matieres: any[] = []

  constructor(private authservice: AuthService, private etudiantservice: EtudiantService, private profservice: ProfesseurService, private router: Router) {

    if (this.authservice.isstudent()) {
      this.etudiantservice.GetCours().subscribe(
        {
          next: (x: any) => {
            console.log('Confirmation successful!',x);
            this.coursList = x
            this.filteredCoursList = this.coursList;

          },
          error: (err: any) => {
            console.log(err);
          }
        }
     );
    } else {
      this.profservice.GetCours().subscribe(
        {
          next: (x: any) => {
            this.coursList = x
            console.log(this.coursList);
            this.filteredCoursList = this.coursList;
          },
          error: (err: any) => {
            console.log(err);
          }
        });
    }

  }


  ngOnInit() {

    this.matieres = ['math', 'physique', 'science', 'arabe', 'francais'];
    console.log();
  }


  joinClassroom(courseId: number): void {
    if (this.authservice.isstudent()) {
      this.router.navigate(['/cours-details', courseId]);
    } else {
      this.router.navigate(['/cours-details-prof', courseId]);
    }


  }



  // Méthode appelée lorsque l'utilisateur sélectionne une matière
  selectMatiere(matiere: string): void {
    this.selectedMatiere == matiere ? this.selectedMatiere = "" : this.selectedMatiere = matiere;
    this.filterCoursList();
  }

  // Méthode appelée lorsque l'utilisateur sélectionne un status
  selectStatus(status: string): void {
    this.selectedStatus == status ? this.selectedStatus = "" : this.selectedStatus = status;
    this.filterCoursList();
  }

  // Méthode qui filtre la liste de cours selon les critères de sélection
  filterCoursList(): void {
    this.filteredCoursList = this.coursList.filter((cours) => {
      if (this.selectedMatiere && cours.matiere !== this.selectedMatiere) {
        return false;
      }
      if (this.selectedStatus && cours.status !== this.selectedStatus) {
        return false;
      }
      return true;
    });
  }

  setStatusLabel(cour: any) {
    let statusLabel: any;
    if (cour.status === 'fait') {
      statusLabel = 'Déjà fait';
    } else if (cour.status === 'encours') {
      statusLabel = 'En cours';
    } else if (cour.status === 'prochainement') {
      const diff = new Date(cour.dateTime).getTime() - new Date().getTime();
      const diffHours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const diffMinutes = Math.floor((diff / 1000 / 60) % 60);
      if (diff < 86400000) {
        // statusLabel = 'Dans moins d\'une journée';
        statusLabel = '';
      } else {
        const diffDays = Math.floor(diff / 86400000);
        statusLabel = `${diffDays}j `;
      }
      if (diffHours > 0 || diffMinutes > 0) {
        statusLabel += `${diffHours}h${diffMinutes}m `;
      }

    }

    return statusLabel

  }


}
