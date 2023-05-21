import { AfterViewInit, Component } from '@angular/core';
import { EtudiantService } from 'src/app/layouts/espace-etudiant/etudiant.service';
import { Etudiant } from 'src/app/models/etudiant';
import { VisioconferanceService } from '../../espace-etudiant/cour-details/visioconferance.service';
import { AuthService } from 'src/app/auth/auth.service';
import { AgoraClient, ClientEvent, NgxAgoraService, StreamEvent } from 'ngx-agora';
import { ActivatedRoute } from '@angular/router';

interface elem {
  exitFullscreen: any;
  mozCancelFullScreen: any;
  webkitExitFullscreen: any;
  fullscreenElement: any;
  mozFullScreenElement: any;
  webkitFullscreenElement: any;
}

@Component({
  selector: 'app-cour-details-prof',
  templateUrl: './cour-details-prof.component.html',
  styleUrls: ['./cour-details-prof.component.css']
})
export class CourDetailsProfComponent implements AfterViewInit {

  options = {
    // appId: '9cdd7cf75a114a678af4302579cd4f2c',
    appId: '8f6e8de6a56448ddb685f1a335a2d81a',
    // channel: 'class',
    channel: '',
    // token: "007eJxTYMjS2PWjf5/JA6sarndXPgS8OLfxzPUQlZN68+ztPOT3qUUrMFgmp6SYJ6eZmyYaGpokmplbJKaZGBsYmZoDJUzSjJJFxdJSGgIZGQ6f52VlZIBAEJ+VITknsbiYgQEAyVkgNg==",
    token: "",
    uid: "0",
  };
  streamSpec = {
    streamID: this.options.uid,
    audio: true,
    video: true,
    screen: false    
  }



  attachments: string[] = ["https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.docx", "https://acdbio.com/sites/default/files/sample.ppt", "https://www.cmu.edu/blackboard/files/evaluate/tests-example.xls"];
  lessonPlan: string[] = [];
  students: Etudiant[] = [];
  showStudentName: boolean | undefined

  showAllStudents = false;
  etudiants_presents: any[] = []
  etudiants_absents: any[] = []
  isSharingEnabled = false;
  isMuteVideo = false;

  localStreams: any[] = [];
  videoClient: AgoraClient



  constructor(private etudiantService: EtudiantService, private VisioService: VisioconferanceService, private authservice: AuthService, private agoraService: NgxAgoraService,private route:ActivatedRoute) {

    const coursid = this.route.snapshot.paramMap.get('id')!;
    console.log(coursid);

    this.options.channel = coursid

    this.VisioService.startMeeting(coursid).subscribe({
      next: (x: any) => {
        console.log(x);
        this.options.token = x.token
      },
      error: (err: any) => console.log(err)
    });

    this.videoClient = this.agoraService.createClient({ mode: "live", codec: "vp8" });

  }

  ngOnInit() {

    const sidebar= document.getElementsByTagName("app-sidebar")[0] as HTMLElement
    sidebar.style.display="none"
    const main= document.getElementsByClassName("main-content")[0] as HTMLElement
    main.style.marginLeft="0"

    this.showStudentName = false
    this.VisioService.getProfGroupes().subscribe({
      next: (x: any) => {
        console.log(x);
      },
      error: (err: any) => console.log(err)
    })
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
     
      s.imageUrl = `https://ui-avatars.com/api/?name=${s.nom}+${s.prenom}&background=random`
      
    })
    console.log(this.students);

  }

  ngAfterViewInit() {

    var elemvideos = document.getElementById("lemhom");
    document.getElementById('mic-btn')!.onclick = () => {
      this.toogleFullScreen(elemvideos)
    };


    document.getElementById('startvideo')!.onclick = () => {
      this.startvideo();
    };
    document.getElementById('startscreenshare')!.onclick = () => {
      this.startScreenShare();
    };


    this.videoClient.on(ClientEvent.PeerOnline, (evt) => {
      const user = evt.uid;
      this.students.forEach(etud => {
        etud.id = user
      })
      // Ajouter l'étudiant au tableau étudiants_présents
      this.etudiants_presents.push(this.students.find(e => e.id == user))
    });

    this.videoClient.on(ClientEvent.PeerLeave, (evt) => {
      const user = evt;

      // Retirer l'étudiant du tableau étudiants_présents
      this.etudiants_presents = this.etudiants_presents!.filter(e => e.id != user.uid);
      // Ajouter l'étudiant au tableau étudiants_absents
      this.etudiants_absents!.push(this.students!.find(e => e.id == user))
    });

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


  private async startvideo() {

    this.videoClient.init(this.options.appId)
    this.videoClient.join(this.options.token, this.options.channel, null, (uid) => {
      this.options.uid = uid as string
      const streamSpec = this.streamSpec

      let localStream = this.agoraService.createStream(streamSpec);
      localStream.setScreenProfile("1080p_1")
      
      localStream.init(
        () => {
          console.log('getUserMedia successfully');
          localStream.play('videodiv');
          document.getElementById('videodiv')!.setAttribute('type', 'camera');
          
          this.videoClient.publish(localStream, (err) =>
            console.log('Publish local stream error: ' + err)
          );
          this.videoClient.on(ClientEvent.LocalStreamPublished, (evt) =>
            console.log('Publish local stream successfully')
          );


        },
        (err) => console.log('getUserMedia failed', err)
      );


      localStream.on(StreamEvent.MediaAccessAllowed, () => {
        console.log('accessAllowed');
      });
      // The user has denied access to the camera and mic.
      localStream.on(StreamEvent.MediaAccessDenied, () => {
        console.log('accessDenied');
      });
    });

  }
  private async startScreenShare() {


    var screenClient = this.agoraService.createClient({ mode: "live", codec: "vp8" });

    screenClient.init(this.options.appId)
    screenClient.join(this.options.token, this.options.channel, null, (uid) => {
      this.localStreams.push(uid);

      this.options.uid = uid as string
      const streamSpec = {
        streamID: this.options.uid,
        audio: false,
        video: false,
        screen: true
      }
      const localStream = this.agoraService.createStream(streamSpec);
      localStream.init(
        () => {
          console.log('getUserMedia successfully');
          localStream.play('videostreamdiv');
          
          document.getElementById('videostreamdiv')!.setAttribute('type', 'screenShare');
          screenClient.publish(localStream, (err) =>
            console.log('Publish local stream error: ' + err)
          );
          screenClient.on(ClientEvent.LocalStreamPublished, (evt) => {
            console.log('Publish local stream successfully')
            const elementvideo = document.getElementById("videodiv");
            const elementvideostream = document.getElementById("videostreamdiv");
            elementvideostream!.style.height="350px";
            elementvideostream!.classList.add("duostream");
            elementvideo!.classList.add("duovideo");
          }
          );
        },
        (err) => console.log('getUserMedia failed', err)
      );


      localStream.on(StreamEvent.MediaAccessAllowed, () => {
        console.log('accessAllowed');
      });
      // The user has denied access to the camera and mic.
      localStream.on(StreamEvent.MediaAccessDenied, () => {
        console.log('accessDenied');
      });

    });
  }




  isFullScreen(element: any): boolean {
    return !!(element.fullscreenElement ||
      element.mozFullScreenElement ||
      element.webkitFullscreenElement ||
      element.msFullscreenElement);
  }

  requestFullScreen(element: any) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    }
  }

  exitFullScreen(element: any) {
    if (element.exitFullscreen) {
      element.exitFullscreen();
    } else if (element.msExitFullscreen) {
      element.msExitFullscreen();
    } else if (element.webkitExitFullscreen) {
      element.webkitExitFullscreen();
    } else if (element.mozCancelFullScreen) {
      element.mozCancelFullScreen();
    }
  }

  toogleFullScreen(element: any): void {
    if (!this.isFullScreen(element)) { // change here
      this.requestFullScreen(element);
    } else {
      this.exitFullScreen(element);
    }
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