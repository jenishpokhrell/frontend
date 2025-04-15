import { Routes } from '@angular/router';
import { LoginComponent } from './components/public/login/login.component';
import { HomeComponent } from './components/public/home/home.component';
import { SignupComponent } from './components/public/signup/signup.component';
import { PostjobsComponent } from './components/main/postjobs/postjobs.component';
import { PagenotfoundComponent } from './components/public/pagenotfound/pagenotfound.component';
import { BrowsejobsComponent } from './components/main/browsejobs/browsejobs.component';
import { AboutUsComponent } from './components/public/about-us/about-us.component';
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
import { EmployerDashboardComponent } from './components/main/dashboard/employer/dashboard/dashboard.component';
import { EmployerProfileComponent } from './components/main/dashboard/employer/profile/profile.component';
import { EmployerExperiencesComponent } from './components/main/dashboard/employer/experiences/experiences.component';
import { MyJobsComponent } from './components/main/dashboard/employer/jobs/jobs.component';
import { JobApplicationsComponent } from './components/main/dashboard/employer/job-applications/job-applications.component';
import { ShortlistedCandidatesComponent } from './components/main/dashboard/employer/shortlisted-candidates/shortlisted-candidates.component';
import { EmployerChangePasswordComponent } from './components/main/dashboard/employer/change-password/change-password.component';
import { CandidateProfileComponent } from './components/main/dashboard/employer/candidate-profile/candidate-profile.component';
import { PostJobComponent } from './components/main/dashboard/employer/post-job/post-job.component';
import { UnauthorizedPageComponent } from './components/public/unauthorized-page/unauthorized-page.component';
import { EditJobComponent } from './components/main/dashboard/employer/edit-job/edit-job.component';
import { authGuard } from './guards/auth.guard';
import { EditProfileComponent } from './components/main/dashboard/candidate/edit-profile/edit-profile.component';
import { NotApprovedComponent } from './components/main/not-approved/not-approved.component';

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
        path:'unauthorized',
        component: UnauthorizedPageComponent
    },
    {
        path: 'admin',
        canActivate: [authGuard],
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
        path: 'employer',
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch:'full'},
            { path: 'dashboard', loadComponent: () => EmployerDashboardComponent},
            { path: 'profile', loadComponent: () => EmployerProfileComponent},
            { path: 'experiences', loadComponent: () => EmployerExperiencesComponent},
            { path: 'jobs', loadComponent: () => MyJobsComponent},
            { path: 'job-applications/:id', loadComponent: () => JobApplicationsComponent},
            { path: 'post-job', loadComponent: () => PostJobComponent},
            { path: 'edit-job/:id', loadComponent: () => EditJobComponent},
            { path: 'candidate-profile/:userId/:jobApplicationId', loadComponent: () => CandidateProfileComponent},
            { path: 'shortlisted-candidates', loadComponent: () => ShortlistedCandidatesComponent},
            { path: 'change-password', loadComponent: () => EmployerChangePasswordComponent},
        ]
    },
    {
        path: 'candidate',
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            { path: 'dashboard', loadComponent: () => CandidateDashboardComponent},
            { path: 'profile', loadComponent: () => ProfileComponent},
            { path: 'academics', loadComponent: () => AcademicsComponent},
            { path: 'experiences', loadComponent: () => ExperiencesComponent},
            { path: 'projects', loadComponent: () => ProjectsComponent},
            { path: 'applied-jobs', loadComponent: () => AppliedJobsComponent},
            { path: 'saved-jobs', loadComponent: () => SavedJobsComponent},
            { path: 'update-profile/:id', loadComponent:() => EditProfileComponent},
            { path: 'change-password', loadComponent: () => ChangePasswordComponent},
        ]
    },
    {
        path: 'viewjob/:id',
        canActivate: [authGuard],
        component: ViewjobComponent
    },
    {
        path: 'not-approved',
        component: NotApprovedComponent
    }
];