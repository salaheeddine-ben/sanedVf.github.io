import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { EtudiantService } from 'src/app/layouts/espace-etudiant/etudiant.service';
import { ProfesseurService } from 'src/app/layouts/espace-professeur/professeur.service';
import { Groupe } from 'src/app/models/groupe';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})


export class GroupsComponent {
  @ViewChild('addGroupPopup') addGroupPopup: TemplateRef<any> | undefined;

  addGroupForm: FormGroup;

  groupList: Groupe[] = []
  filteredgroupList: any[] = []
  selectedniveau: string | null = null;
  niveauScolaire: any[] = []
  creationMessage:String=""

  constructor(private etudiantservice:EtudiantService,private profservice :ProfesseurService,private modalService: NgbModal, private professeurService: ProfesseurService, private authservice: AuthService) {

    this.addGroupForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      pricePerLecture: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      nbEtudiants: new FormControl('', Validators.required)
    });

    if(this.authservice.isstudent()){
      this.etudiantservice.Getgroupes().subscribe(data => {
        this.groupList = data 
        console.log(this.groupList);
        this.groupList.sort((a, b) => {
          return new Date(b.creation).getTime() - new Date(a.creation).getTime();
        });
      });
    } else{
      this.profservice.GetGroupes().subscribe(data => {
        this.groupList = data 
        console.log(this.groupList);
        console.log("groupe de prof");
        this.groupList.sort((a, b) => {
          return new Date(b.creation).getTime() - new Date(a.creation).getTime();
        });

      });
    }

    
  }

  ngOnInit() {
    this.niveauScolaire=["primaire","moyen","secondaire","bac"]
    this.groupList.forEach(g => {
      this.niveauScolaire.push(g.niveauScolaire)
    })
    this.filteredgroupList = this.groupList;
    console.log(this.filteredgroupList);

   
  }

  // Méthode appelée lorsque l'utilisateur sélectionne une matière
  selectniveau(niveau: string): void {
    this.selectedniveau == niveau ? this.selectedniveau = "" : this.selectedniveau = niveau;
    this.filtergroupList();
  }

  // Méthode qui filtre la liste de cours selon les critères de sélection
  filtergroupList(): void {
    this.filteredgroupList = this.groupList.filter((groups) => {
      if (this.selectedniveau && groups.niveauScolaire !== this.selectedniveau) {
        return false;
      }
      return true;
    });
  }







  // Définir la fonction pour ouvrir le popup
  openAddGroupPopup() {
    this.modalService.open(this.addGroupPopup, { size: 'lg' });
  }

  // Définir la fonction pour fermer le popup
  closeAddGroupPopup() {
    this.modalService.dismissAll();
  }

  addGroup() {
  console.log(this.addGroupForm.value);
    this.professeurService.CreateGroupe(this.addGroupForm.value).subscribe({
      next: (x: any) => {
        console.log(x);
        this.creationMessage=x.message

        if(this.authservice.isstudent()){
          this.etudiantservice.Getgroupes().subscribe(data => {
            this.groupList = data 
            this.groupList.sort((a, b) => {
              return new Date(b.creation).getTime() - new Date(a.creation).getTime();
            });
          });
        } else{
          this.profservice.GetGroupes().subscribe(data => {
            this.groupList = data 
            this.groupList.sort((a, b) => {
              return new Date(b.creation).getTime() - new Date(a.creation).getTime();
            });
          });
        }
       
      },
      error: (err: any) => { this.creationMessage=err.message ;console.log(err); }
    })


  }



}
