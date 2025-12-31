import { Component, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-achievements",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./achievements.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AchievementsComponent {}
