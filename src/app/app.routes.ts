import { Routes } from '@angular/router';
import { LoginComponent } from './components/public/login/login.component';
import { HomeComponent } from './components/public/home/home.component';
import { SignupComponent } from './components/public/signup/signup.component';
import { PostjobsComponent } from './components/main/postjobs/postjobs.component';
import { PagenotfoundComponent } from './components/public/pagenotfound/pagenotfound.component';
import { BrowsejobsComponent } from './components/main/browsejobs/browsejobs.component';
import { AboutUsComponent } from './components/public/about-us/about-us.component';
import { EmployerComponent } from './components/main/dashboard/employer/employer.component';
import { ViewjobComponent } from './components/main/viewjob/viewjob.component';
import { AdminDashboardComponent } from './components/main/dashboard/admin/dashboard/dashboard.component';
import { UsersComponent } from './components/main/dashboard/admin/users/users.component';
import { PendingEmployersComponent } from './components/main/dashboard/admin/pending-employers/pending-employers.component';
import { JobsComponent } from './components/main/dashboard/admin/jobs/jobs.component';
import { LogsComponent } from './components/main/dashboard/admin/logs/logs.component';
import { CandidateDashboardComponent } from './components/main/dashboard/candidate/dashboard/dashboard.component';
import { ProfileComponent } from './components/main/dashboard/candidate/profile/profile.component';
import { AcademicsComponent } from './components/main/dashboard/candidate/academics/academics.component';
import { ExperiencesComponent } from './components/main/dashboard/candidate/experiences/experiences.component';
import { ProjectsComponent } from './components/main/dashboard/candidate/projects/projects.component';
import { AppliedJobsComponent } from './components/main/dashboard/candidate/applied-jobs/applied-jobs.component';
import { SavedJobsComponent } from './components/main/dashboard/candidate/saved-jobs/saved-jobs.component';
import { ChangePasswordComponent } from './components/main/dashboard/candidate/change-password/change-password.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent
    },
    {
        path: 'about-us',
        component: AboutUsComponent
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'postjobs',
        component: PostjobsComponent
    },
    {
        path: 'browsejobs',
        component: BrowsejobsComponent
    },
    {
        path:'notfound',
        component: PagenotfoundComponent
    },
    {
        path: 'admin',
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', loadComponent: () => AdminDashboardComponent},
            {path: 'users', loadComponent: () => UsersComponent},
            {path: 'pending-employers', loadComponent: () => PendingEmployersComponent},
            {path: 'jobs', loadComponent: () => JobsComponent},
            {path: 'logs', loadComponent: () => LogsComponent}
        ]
    },
    {
        path: 'employerdashboard',
        component: EmployerComponent
    },
    {
        path: 'candidate',
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            { path: 'dashboard', loadComponent: () => CandidateDashboardComponent},
            { path: 'profile', loadComponent: () => ProfileComponent},
            { path: 'academics', loadComponent: () => AcademicsComponent},
            { path: 'experiences', loadComponent: () => ExperiencesComponent},
            { path: 'projects', loadComponent: () => ProjectsComponent},
            { path: 'applied-jobs', loadComponent: () => AppliedJobsComponent},
            { path: 'saved-jobs', loadComponent: () => SavedJobsComponent},
            { path: 'change-password', loadComponent: () => ChangePasswordComponent},
        ]
    },
    {
        path: 'viewjob',
        component: ViewjobComponent
    },
];