import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { EtudiantService } from 'src/app/layouts/espace-etudiant/etudiant.service';
import { ProfesseurService } from 'src/app/layouts/espace-professeur/professeur.service';

@Component({
  selector: 'app-explore-details',
  templateUrl: './explore-details.component.html',
  styleUrls: ['./explore-details.component.css']
})
export class ExploreDetailsComponent {
  prof: any = {
    adresse: null,
    bio: "",
    codePostal: null,
    date_naissance: null,
    email: "",
    etablissement: null,
    id: null,
    imageUrl: "",
    module: null,
    niveau: "",
    nom: "",
    prenom: "",
    telephone: null,
    ville: "",
    groups: []
  }

  groupForm: FormGroup;
  selectedGroup: any;
  reponsegroupe:String=""
  reponsegrouperefus:String=""

  constructor(private formBuilder: FormBuilder, private authservice: AuthService, private route: ActivatedRoute, private profservice: ProfesseurService, private etudiantservice: EtudiantService,private router: Router) {

    const profId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.profservice.GetglobaleprofDetails(profId).subscribe(data => {
      this.prof = data
      this.selectedGroup = this.prof.groups[0];
      console.log(this.prof);
    });

    this.groupForm = this.formBuilder.group({
      groupId: ['']
    });

  }

  onSubmit(): void {
    if (this.groupForm.valid) {

      console.log(this.groupForm.value);
      this.etudiantservice.rejoindreGroupe(this.groupForm.value.groupId).subscribe({
        next: (x: any) => {
          console.log(x)
          this.reponsegroupe="Une demande à été envoyer au professeur !"
          // setTimeout(()=>{
          //   this.router.navigate(['/espace-etudiant']);
          // },3500)
        },
        error: (err: any) => {
          this.reponsegrouperefus="Vous avez deja envoyé une demande !"
          setTimeout(()=>{
            this.router.navigate(['/espace-etudiant/cours']);
          },4500)
          console.log(err)}
      })
    }
  }

  onGroupSelectionChange() {
    const selectedGroupId = this.groupForm.value.groupId;
    this.selectedGroup = this.prof.groups.find((group: any) => group._id === selectedGroupId);
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
