import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { AchievementsComponent } from './pages/achievements/achievements.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, title: 'Home | Sandesh Kumar Gupta' },
  { path: 'about', component: AboutComponent, title: 'About | Sandesh Kumar Gupta' },
  { path: 'projects', component: ProjectsComponent, title: 'Projects | Sandesh Kumar Gupta' },
  { path: 'projects/:slug', component: ProjectDetailComponent, title: 'Project Details | Sandesh Kumar Gupta' },
  { path: 'achievements', component: AchievementsComponent, title: 'Achievements | Sandesh Kumar Gupta' },
  { path: 'contact', component: ContactComponent, title: 'Contact | Sandesh Kumar Gupta' },
  { path: '**', component: NotFoundComponent, title: '404 Not Found' }
];
