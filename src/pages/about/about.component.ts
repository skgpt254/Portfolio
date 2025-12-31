import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,  // Add this line
  imports: [CommonModule]
})
export class AboutComponent {
  private dataService = inject(PortfolioDataService);
  skills = this.dataService.skills;
}
