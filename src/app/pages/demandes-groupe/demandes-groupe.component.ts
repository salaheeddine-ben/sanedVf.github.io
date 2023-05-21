import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ProfesseurService } from 'src/app/layouts/espace-professeur/professeur.service';

@Component({
  selector: 'app-demandes-groupe',
  templateUrl: './demandes-groupe.component.html',
  styleUrls: ['./demandes-groupe.component.css']
})
export class DemandesGroupeComponent {

  DemandeList: any[] = []
  filteredDemandesList: any[] = []
  matieres: any[] = []
  selectedStatus: string | null = null;
  lesStatus = ["enrolled", "accepted"]

  constructor(private authservice: AuthService, private profservice: ProfesseurService) {

    this.profservice.GetDemandes().subscribe(
      {
        next: (x: any) => {
          this.DemandeList = x
          this.filteredDemandesList = this.DemandeList;
        },
        error: (err: any) => {
          console.log(err);
        }
      });

  }

  ngOnInit() { }

  accepter(demandeId: any) {
    console.log(demandeId);
    this.profservice.acctepterdemande(demandeId).subscribe(
      {
        next: (x: any) => {
          console.log('Confirmation successful!', x);

          this.profservice.GetDemandes().subscribe(data => {
            this.DemandeList = data
            console.log(this.DemandeList);
          });

        },
        error: (err: any) => console.log(err)
      }
    )
  }
  refuser(demandeId: any) {

  }


  // Méthode appelée lorsque l'utilisateur sélectionne un status
  selectdemandeStatus(status: string): void {
    this.selectedStatus == status ? this.selectedStatus = "" : this.selectedStatus = status;
    this.filterCoursList();
  }

  filterCoursList(): void {
    this.filteredDemandesList = this.DemandeList.filter((demande) => {
      if (this.selectedStatus && demande.status !== this.selectedStatus) {
        return false;
      }
      return true;
    });
  }

}
