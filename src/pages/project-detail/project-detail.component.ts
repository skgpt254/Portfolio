// FIX: Import `signal` from `@angular/core` and remove unused `computed` import.
import { ChangeDetectionStrategy, Component, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink]
})
export class ProjectDetailComponent {
  private dataService = inject(PortfolioDataService);
  private router = inject(Router);

  project = signal<Project | null>(null);

  @Input()
  set slug(slug: string) {
    const foundProject = this.dataService.getProjectBySlug(slug);
    if (foundProject) {
      this.project.set(foundProject);
    } else {
      this.router.navigate(['/404']);
    }
  }
}
