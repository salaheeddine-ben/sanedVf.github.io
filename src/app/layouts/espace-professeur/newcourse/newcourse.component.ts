import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfesseurService } from '../professeur.service';

interface Fileinput {
  name: string;
  content: string;
}

@Component({
  selector: 'app-newcourse',
  templateUrl: './newcourse.component.html',
  styleUrls: ['./newcourse.component.css']
})


export class NewcourseComponent {

  courseForm: FormGroup;
  teacherGroups: any[] = [];

  files: File[] = [];
  filesinputs: Fileinput[] = [{ name: '', content: "" }];

  constructor(private fb: FormBuilder, private profservice: ProfesseurService) {

    this.courseForm = this.fb.group({
      group: [null, Validators.required]
    });


  }

  ngOnInit() {
    this.courseForm = new FormGroup({
      plan: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      group: new FormControl('', Validators.required)
    });

    this.profservice.GetGroupes().subscribe(
      {
        next: (x: any) => { this.teacherGroups = x },
        error: (err: any) => { console.log(err); }
      })
  }

  addFile() {
    this.filesinputs.push({ name: '', content: "" });
  }

  removeFile(file: Fileinput) {
    this.filesinputs = this.filesinputs.filter(f => f !== file);
  }

  onFileSelected(event: any) {
    const fille = event.target.files;
    this.files.push(fille[0])
  }

  onSubmit() {
    const formData: FormData = new FormData();
    formData.append('plan', this.courseForm.get('plan')!.value);
    formData.append('time', this.courseForm.get('time')!.value);
    formData.append('group', this.courseForm.get('group')!.value);

    this.files.forEach((file) => {
      formData.append('files', file);
    });

    this.profservice.CreateCour(formData).subscribe(
      {
        next: (x: any) => { console.log(x); },
        error: (err: any) => { console.log(err); }
      }
    )
  }

}