import { Routes } from '@angular/router';
import { LoginComponent } from './components/public/login/login.component';
import { HomeComponent } from './components/public/home/home.component';
import { SignupComponent } from './components/public/signup/signup.component';
import { PagenotfoundComponent } from './components/public/pagenotfound/pagenotfound.component';
import { BrowsejobsComponent } from './components/main/browsejobs/browsejobs.component';
import { AboutUsComponent } from './components/public/about-us/about-us.component';
import { ViewjobComponent } from './components/main/viewjob/viewjob.component';
import { AdminDashboardComponent } from './components/main/dashboard/admin/pages/dashboard/dashboard.component';
import { UsersComponent } from './components/main/dashboard/admin/pages/users/users.component';
import { PendingEmployersComponent } from './components/main/dashboard/admin/pages/pending-employers/pending-employers.component';
import { JobsComponent } from './components/main/dashboard/admin/pages/jobs/jobs.component';
import { LogsComponent } from './components/main/dashboard/admin/pages/logs/logs.component';
import { CandidateDashboardComponent } from './components/main/dashboard/candidate/pages/dashboard/dashboard.component';
import { ProfileComponent } from './components/main/dashboard/candidate/pages/profile/profile.component';
import { AcademicsComponent } from './components/main/dashboard/candidate/pages/academics/academics.component';
import { ExperiencesComponent } from './components/main/dashboard/candidate/pages/experiences/experiences.component';
import { ProjectsComponent } from './components/main/dashboard/candidate/pages/projects/projects.component';
import { AppliedJobsComponent } from './components/main/dashboard/candidate/pages/applied-jobs/applied-jobs.component';
import { SavedJobsComponent } from './components/main/dashboard/candidate/pages/saved-jobs/saved-jobs.component';
import { ChangePasswordComponent } from './components/main/dashboard/candidate/pages/change-password/change-password.component';
import { EmployerDashboardComponent } from './components/main/dashboard/employer/pages/dashboard/dashboard.component';
import { EmployerExperiencesComponent } from './components/main/dashboard/employer/pages/experiences/experiences.component';
import { MyJobsComponent } from './components/main/dashboard/employer/pages/jobs/jobs.component';
import { JobApplicationsComponent } from './components/main/dashboard/employer/pages/job-applications/job-applications.component';
import { ShortlistedCandidatesComponent } from './components/main/dashboard/employer/pages/shortlisted-candidates/shortlisted-candidates.component';
import { EmployerChangePasswordComponent } from './components/main/dashboard/employer/pages/change-password/change-password.component';
import { CandidateProfileComponent } from './components/main/dashboard/employer/pages/candidate-profile/candidate-profile.component';
import { PostJobComponent } from './components/main/dashboard/employer/pages/post-job/post-job.component';
import { UnauthorizedPageComponent } from './components/public/unauthorized-page/unauthorized-page.component';
import { EditJobComponent } from './components/main/dashboard/employer/pages/edit-job/edit-job.component';
import { authGuard } from './guards/auth/auth.guard';
import { EditProfileComponent } from './components/main/dashboard/candidate/pages/edit-profile/edit-profile.component';
import { NotApprovedComponent } from './components/main/not-approved/not-approved.component';
import { EmployerComponent } from './components/main/dashboard/admin/pages/employer/employer.component';
import { EmployerProfileComponent } from './components/main/dashboard/employer/pages/profile/profile.component';
import { roleGuard } from './guards/role/role.guard';
import { EditEmployerProfileComponent } from './components/main/dashboard/employer/pages/edit-employer-profile/edit-employer-profile.component';
import { SearchjobsComponent } from './components/main/search-jobs/search-jobs.component';
import { SidebarComponent } from './components/reusable/sidebar/sidebar.component';
import { CandidateLayoutComponent } from './components/main/dashboard/candidate/candidatelayout/candidatelayout.component';
import { EmployerlayoutComponent } from './components/main/dashboard/employer/employerlayout/employerlayout.component';
import { AdminlayoutComponent } from './components/main/dashboard/admin/adminlayout/adminlayout.component';
import { EmployerprofileforcandidateComponent } from './components/main/dashboard/candidate/pages/employerprofileforcandidate/employerprofileforcandidate.component';

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
        path: 'browsejobs',
        canActivate: [authGuard, roleGuard],
        data: {
            roles: ["CANDIDATE"]
        },
        component: BrowsejobsComponent
    },
    {
        path: 'searchjobs',
        canActivate: [authGuard, roleGuard],
        data: {
            roles: ["CANDIDATE"]
        },
        component: SearchjobsComponent
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
        component: AdminlayoutComponent,
        canActivate: [authGuard, roleGuard],
        data: {
            roles: ['ADMIN']
        },
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', loadComponent: () => AdminDashboardComponent},
            {path: 'users', loadComponent: () => UsersComponent},
            {path: 'pending-employers', loadComponent: () => PendingEmployersComponent},
            {path: 'employer-profile/:employerId', loadComponent: () => EmployerComponent},
            {path: 'jobs', loadComponent: () => JobsComponent},
            {path: 'logs', loadComponent: () => LogsComponent}
        ]
    },
    {
        path: 'employer',
        component: EmployerlayoutComponent,
        canActivate: [authGuard, roleGuard],
        data: {
            roles: ['EMPLOYER']
        },
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch:'full'},
            { path: 'dashboard', loadComponent: () => EmployerDashboardComponent},
            { path: 'profile', loadComponent: () => EmployerProfileComponent},
            { path: 'experiences', loadComponent: () => EmployerExperiencesComponent},
            { path: 'jobs', loadComponent: () => MyJobsComponent},
            { path: 'job-applications/:id', loadComponent: () => JobApplicationsComponent},
            { path: 'post-job', loadComponent: () => PostJobComponent},
            { path: 'edit-job/:id', loadComponent: () => EditJobComponent},
            { path: 'edit-profile/:id', loadComponent: () => EditEmployerProfileComponent },
            { path: 'candidate-profile/:userId', loadComponent: () => CandidateProfileComponent},
            { path: 'candidate-profile/:userId/:jobApplicationId', loadComponent: () => CandidateProfileComponent},
            { path: 'shortlisted-candidates', loadComponent: () => ShortlistedCandidatesComponent},
            { path: 'change-password', loadComponent: () => EmployerChangePasswordComponent},
        ]
    },
    {
        path: 'candidate',
        component: CandidateLayoutComponent,
        canActivate: [authGuard, roleGuard],
        data: {
            roles: ["CANDIDATE"]
        },
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            { path: 'dashboard', loadComponent: () => CandidateDashboardComponent},
            { path: 'profile', loadComponent: () => ProfileComponent},
            { path: 'academics', loadComponent: () => AcademicsComponent},
            { path: 'experiences', loadComponent: () => ExperiencesComponent},
            { path: 'projects', loadComponent: () => ProjectsComponent},
            { path: 'applied-jobs', loadComponent: () => AppliedJobsComponent},
            { path: 'saved-jobs', loadComponent: () => SavedJobsComponent},
            { path: 'employerprofile/:userId', loadComponent: () => EmployerprofileforcandidateComponent},
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