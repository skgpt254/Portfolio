import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class ProjectDetailComponent {
  private dataService = inject(PortfolioDataService);
  private router      = inject(Router);

  project = signal<Project | null>(null);

  @Input()
  set slug(slug: string) {
    const found = this.dataService.getProjectBySlug(slug);
    if (found) {
      this.project.set(found);
    } else {
      // FIX #5: navigate to '' (home) not '/404' — wildcard ** handles unknown routes
      this.router.navigate(['']);
    }
  }
}
