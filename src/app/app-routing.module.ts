import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminDashboardComponent } from './layouts/admin-dashboard/admin-dashboard.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { TablesComponent } from './pages/tables/tables.component';
import { PageadminComponent } from './pages/page-admin/page-admin.component';
import { AuthGuard } from './auth/auth.guard';
import { EspaceEtudiantComponent } from './layouts/espace-etudiant/espace-etudiant.component';
import { EspaceProfesseurComponent } from './layouts/espace-professeur/espace-professeur.component';
import { CourDetailsComponent } from './layouts/espace-etudiant/cour-details/cour-details.component';
import { TimetableComponent } from './pages/timetable/timetable.component';
import { MessagerieComponent } from './components/messagerie/messagerie.component';
import { CoursComponent } from './pages/cours/cours.component';
import { EmailValidationComponent } from './auth/email-validation/email-validation.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { NewcourseComponent } from './layouts/espace-professeur/newcourse/newcourse.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { RegisterProfComponent } from './auth/register-prof/register-prof.component';
import { PageEtudiantComponent } from './pages/page-etudiant/page-etudiant.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { ExploreDetailsComponent } from './pages/explore-details/explore-details.component';
import { DemandesGroupeComponent } from './pages/demandes-groupe/demandes-groupe.component';
import { CourDetailsProfComponent } from './layouts/espace-professeur/cour-details-prof/cour-details-prof.component';
  

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registerprof', component: RegisterProfComponent },
  { path: 'emailvalidation', component: EmailValidationComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'cours-details/:id', component: CourDetailsComponent },
  { path: 'cours-details-prof/:id', component: CourDetailsProfComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'explore-details/:id', component: ExploreDetailsComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate:[AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '',component: PageadminComponent},
      { path: 'user-profile',component:UserProfileComponent },
      { path: 'tables',component:TablesComponent },
      { path: 'icons',component:UserProfileComponent },
    ]
  },
  { path: 'espace-etudiant', component: EspaceEtudiantComponent,canActivate:[AuthGuard],
  children: [
    { path: '', component: PageEtudiantComponent },
      { path: 'dashboard', component: PageEtudiantComponent},
      { path: 'profile',component:UserProfileComponent },
      { path: 'cours',component:CoursComponent },
      { path: 'cour_details',component:CourDetailsComponent },
      { path: 'timetable',component:TimetableComponent },
      { path: 'messages',component:MessagerieComponent },
    ]
  },
 
  { path: 'espace-professeur', component: EspaceProfesseurComponent ,canActivate:[AuthGuard],
  children: [
    { path: '', component: PageadminComponent },
      { path: 'dashboard', component: PageadminComponent},
      { path: 'groups', component: GroupsComponent},
      { path: 'demandes', component: DemandesGroupeComponent},
      { path: 'newcourse', component: NewcourseComponent},
      { path: 'profile',component:UserProfileComponent },
      { path: 'cours',component:CoursComponent },
      { path: 'cour_details_prof',component:CourDetailsProfComponent },
      { path: 'timetable',component:TimetableComponent },
      { path: 'messages',component:MessagerieComponent },
    ] }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
