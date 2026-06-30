import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule], // FIX #12: CommonModule required for @for/@if in template
})
export class AboutComponent {
  private dataService = inject(PortfolioDataService);
  skills         = this.dataService.skills;
  socialLinks    = this.dataService.socialLinks;
  contactInfo    = this.dataService.contactInfo;
  certifications = this.dataService.certifications;

  readonly dotGrid = Array<number>(25).fill(0);
}
