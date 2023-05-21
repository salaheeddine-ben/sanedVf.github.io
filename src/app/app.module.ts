import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminDashboardComponent } from './layouts/admin-dashboard/admin-dashboard.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { TablesComponent } from './pages/tables/tables.component';
import { PageadminComponent } from './pages/page-admin/page-admin.component';
import { EspaceEtudiantComponent } from './layouts/espace-etudiant/espace-etudiant.component';
import { EspaceProfesseurComponent } from './layouts/espace-professeur/espace-professeur.component';
import { CourDetailsComponent } from './layouts/espace-etudiant/cour-details/cour-details.component';
import { CoursComponent } from './pages/cours/cours.component';
import { TimetableComponent } from './pages/timetable/timetable.component';
import { ScheduleModule, RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EmailValidationComponent } from './auth/email-validation/email-validation.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { NgxAgoraModule, AgoraConfig  } from 'ngx-agora';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { NewcourseComponent } from './layouts/espace-professeur/newcourse/newcourse.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { RegisterProfComponent } from './auth/register-prof/register-prof.component';
import { CourDetailsProfComponent } from './layouts/espace-professeur/cour-details-prof/cour-details-prof.component';
import { PageEtudiantComponent } from './pages/page-etudiant/page-etudiant.component';
import { PageProfesseurComponent } from './pages/page-professeur/page-professeur.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { ExploreDetailsComponent } from './pages/explore-details/explore-details.component';
import { DemandesGroupeComponent } from './pages/demandes-groupe/demandes-groupe.component';
import { StripeModule } from "stripe-angular";



const agoraConfig: AgoraConfig = {
  // AppID: '9cdd7cf75a114a678af4302579cd4f2c',
  AppID: '8f6e8de6a56448ddb685f1a335a2d81a',
};



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    RegisterComponent,
    UserProfileComponent,
    TablesComponent,
    PageadminComponent,
    EspaceEtudiantComponent,
    EspaceProfesseurComponent,
    CourDetailsComponent,
    CoursComponent,
    TimetableComponent,
    EmailValidationComponent,
    ResetPasswordComponent,
    NewcourseComponent,
    GroupsComponent,
    RegisterProfComponent,
    CourDetailsProfComponent,
    PageEtudiantComponent,
    PageProfesseurComponent,
    ExploreComponent,
    ExploreDetailsComponent,
    DemandesGroupeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule ,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    ScheduleModule, RecurrenceEditorModule,
    Ng2SearchPipeModule,
    NgxAgoraModule.forRoot(agoraConfig),
    // StripeModule.forRoot("pk_test_51N8J4xFjSH2kRPsExyN9Lcx6hFmsgMIVKCnY0ITSM7s8mGSFZ1Jt0x0e4z3eRvK26nDJ6fTTeQX4cqOn0Ax7R1hH00QbJZiPaK"),
    FormsModule,      
  ],
  providers: [{provide : HTTP_INTERCEPTORS,useClass : TokenInterceptor,multi: true}],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
