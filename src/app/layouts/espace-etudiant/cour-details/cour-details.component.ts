import { AfterViewInit, Component, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EtudiantService } from 'src/app/layouts/espace-etudiant/etudiant.service';
import { VisioconferanceService } from './visioconferance.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Etudiant } from 'src/app/models/etudiant';
import { ClientEvent, NgxAgoraService, Stream, StreamEvent } from 'ngx-agora';
import { select } from '@syncfusion/ej2-angular-schedule';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cour-details',
  templateUrl: './cour-details.component.html',
  styleUrls: ['./cour-details.component.css']
})



export class CourDetailsComponent implements AfterViewInit {

  options = {
    // appId: '9cdd7cf75a114a678af4302579cd4f2c',
    appId: '8f6e8de6a56448ddb685f1a335a2d81a',
    // channel: 'class',
    channel: '',
    // token: "007eJxTYMjS2PWjf5/JA6sarndXPgS8OLfxzPUQlZN68+ztPOT3qUUrMFgmp6SYJ6eZmyYaGpokmplbJKaZGBsYmZoDJUzSjJJFxdJSGgIZGQ6f52VlZIBAEJ+VITknsbiYgQEAyVkgNg==",
    token: "",
    uid: 1,
  };
  attachments: string[] = ["https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.docx", "https://acdbio.com/sites/default/files/sample.ppt", "https://www.cmu.edu/blackboard/files/evaluate/tests-example.xls"];
  lessonPlan: string[] = [];
  students: Etudiant[] = [];
  showStudentName: boolean | undefined

  showAllStudents = false;
  client: any

  etudiants_presents: any[] = []
  etudiants_absents: any[] = []



  constructor(private etudiantService: EtudiantService, private VisioService: VisioconferanceService, private authservice: AuthService, private agoraService: NgxAgoraService,private route: ActivatedRoute,) {

    const courseId =this.route.snapshot.paramMap.get('id')!;

    
    const sidebar= document.getElementsByTagName("app-sidebar")[0] as HTMLElement
    // sidebar.style.display="none"
    const main= document.getElementsByClassName("main-content")[0] as HTMLElement
    // main.style.marginLeft="0"
    
   this.options.channel=courseId
    this.VisioService.joinMeeting(courseId).subscribe({
      next: (x: any) => {
        console.log(x);
        this.options.token = x.token
      },
      error: (err: any) => console.log(err)
    });
    this.client = this.agoraService.createClient({ mode: "live", codec: "vp8" });

  }

  ngOnInit() {



    this.showStudentName = false
    // this.lessonPlan = this.etudiantService.getLessonPlan(); 
    // this.attachments = this.etudiantService.getAttachments();
    // this.students = this.etudiantService.getStudents(); 
    this.students = [
      {
        id: "1",
        nom: "bengharez",
        prenom: "salaheddine",
        email: "bengharez.salah@gmail.com",
        adresse: "string",
        ville: "string",
        date_naissance: new Date(),
        etablissement: "String",
        niveau_scolaire: "String",
        imageUrl: "",
        // imageUrl: "assets/img/theme/team-4-800x800.jpg",
        telephone:""
      },
      {
        id: "2",
        nom: "bengharez",
        prenom: "salaheddine",
        email: "bengharez.salah@gmail.com",
        adresse: "string",
        ville: "string",
        date_naissance: new Date(),
        etablissement: "String",
        niveau_scolaire: "String",
        imageUrl: "",
        telephone:""
      },
      {
        id: "3",
        nom: "bengharez",
        prenom: "salaheddine",
        email: "bengharez.salah@gmail.com",
        adresse: "string",
        ville: "string",
        date_naissance: new Date(),
        etablissement: "String",
        niveau_scolaire: "String",
        imageUrl: "",
        telephone:""
      },
      {
        id: "4",
        nom: "bengharez",
        prenom: "salaheddine",
        email: "bengharez.salah@gmail.com",
        adresse: "string",
        ville: "string",
        date_naissance: new Date(),
        etablissement: "String",
        niveau_scolaire: "String",
        imageUrl: "",
        telephone:""
      },
      {
        id: "5",
        nom: "bengharez",
        prenom: "salaheddine",
        email: "bengharez.salah@gmail.com",
        adresse: "string",
        ville: "string",
        date_naissance: new Date(),
        etablissement: "String",
        niveau_scolaire: "String",
        imageUrl: "",
        telephone:""
      },
      {
        id: "6",
        nom: "bengharez",
        prenom: "salaheddine",
        email: "bengharez.salah@gmail.com",
        adresse: "string",
        ville: "string",
        date_naissance: new Date(),
        etablissement: "String",
        niveau_scolaire: "String",
        imageUrl: "",
        telephone:""
      },
      {
        id: "7",
        nom: "bengharez",
        prenom: "salaheddine",
        email: "bengharez.salah@gmail.com",
        adresse: "string",
        ville: "string",
        date_naissance: new Date(),
        etablissement: "String",
        niveau_scolaire: "String",
        imageUrl: "",
        telephone:""
      },
    ]

    this.students.forEach(s => {
      if (!s.imageUrl) {
        s.imageUrl = `https://ui-avatars.com/api/?name=${s.nom}+${s.prenom}&background=random`
      }
    })

  }

  ngAfterViewInit() {
    document.getElementById('join')!.onclick = () => {
      this.join();
    };

    this.agoraService.client.on(ClientEvent.PeerOnline, (evt) => {
      const user = evt.uid;
      this.students.forEach(etud => {
        etud.id = user
      })

      console.log(this.students);
      // Ajouter l'étudiant au tableau étudiants_présents
      this.etudiants_presents.push(this.students.find(e => e.id == user))
      console.log("Peeronline" + user, "tableau etudiant presents", this.etudiants_presents);
    });

    this.agoraService.client.on(ClientEvent.PeerLeave, (evt) => {
      const user = evt;

      // Retirer l'étudiant du tableau étudiants_présents
      this.etudiants_presents = this.etudiants_presents!.filter(e => e.id != user.uid);
      // Ajouter l'étudiant au tableau étudiants_absents
      this.etudiants_absents!.push(this.students!.find(e => e.id == user))
    });



  }
  private async join() {
    this.client.init(this.options.appId)
    this.client.join(this.options.token, this.options.channel, this.options.uid, (uid: any) => {
      console.log("user uid :::" + uid);

      this.agoraService.client.on(ClientEvent.RemoteStreamAdded, (evt) => {
        const stream = evt.stream as Stream;
        this.agoraService.client.subscribe(stream);
        // const type = stream.getVideoElement().getAttribute('type');


      });

     
      this.agoraService.client.on(ClientEvent.RemoteStreamSubscribed, async (evt) => {
        const stream = evt.stream as Stream;
        setTimeout(() => { 
          const typo =  stream.getAudioTrack() as MediaStreamTrack ;
          console.log("%c text","color:red");
          console.log(typo.enabled);
          if(typo.enabled == true){
            console.log("%c text","color:green");
            console.log(typo.enabled);
            const elementvideo = document.getElementById("videodiv");
            elementvideo!.classList.add("duovideo");
            stream.play("videodiv")
          } else{
            console.log("%c text","color:green");
            console.log(typo.enabled);
            const elementvideostream = document.getElementById("videostreamdiv");
            elementvideostream!.style.height="350px";
            elementvideostream!.classList.add("duostream");
            stream.play("videostreamdiv")
          }
      }, 3000);
      });
    })



    this.agoraService.client.on(ClientEvent.Error, (err) => {
      console.log('Got error msg:', err.reason);
      if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.agoraService.client.renewChannelKey(
          '',
          () => {
            console.log('Renew channel key successfully');
          },
          (err) => {
            console.log('Renew channel key failed: ', err);
          }
        );
      }

    });


  }




  getBasename(filename: any) {
    return filename.split('/').pop().split('.').shift();
  }

  getIconClass(fileName: any): string {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'ppt':
      case 'pptx':
        return 'fa-solid fa-file-powerpoint ppt';
      case 'doc':
      case 'docx':
        return 'fa-solid fa-file-word word';
      case 'xls':
      case 'xlsx':
        return 'fa-solid fa-file-excel excel';
      case 'pdf':
        return 'fa-solid fa-file-pdf pdf';
      case 'png':
      case 'jpg':
        return 'fa-solid fa-image fichier';
      default:
        return 'fa-solid fa-file fichier';
    }
  }

  start() {
  }

  toggleFullscreen(video: any) {
    if (video.fullscreen) {
      video.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  }
  toggleMute() {
    // this.socket.emit('toggleMute');
  }
  raiseHand() {
    // this.socket.emit('raiseHand'); 
  }

  // onSubmit(form: NgForm) {
  //   const question = form.value.question;
  //   this.etudiantService.askQuestion(question);
  //   form.reset();
  // }



}
