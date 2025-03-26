import { Routes } from '@angular/router';
import { LoginComponent } from './components/public/login/login.component';
import { HomeComponent } from './components/public/home/home.component';
import { SignupComponent } from './components/public/signup/signup.component';
import { PostjobsComponent } from './components/main/postjobs/postjobs.component';
import { PagenotfoundComponent } from './components/public/pagenotfound/pagenotfound.component';
import { BrowsejobsComponent } from './components/main/browsejobs/browsejobs.component';
import { AboutUsComponent } from './components/public/about-us/about-us.component';

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
    }
];