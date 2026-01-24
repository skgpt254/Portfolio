import { Component, ChangeDetectionStrategy, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-achievements",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./achievements.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AchievementsComponent {
  certificates = [
    "assets/images/certifications/1c.jpg",
    "assets/images/certifications/2c.jpg",
    "assets/images/certifications/3c.png",
    "assets/images/certifications/4c.png",
    "assets/images/certifications/5c.png",
    "assets/images/certifications/6c.png",
    "assets/images/certifications/7c.jpg",
    "assets/images/certifications/8c.jpg",
    "assets/images/certifications/9c.png",
  ];

  selectedCertIndex: number | null = null;

  openCert(index: number) {
    this.selectedCertIndex = index;
    document.body.style.overflow = "hidden";
  }

  closeCert() {
    this.selectedCertIndex = null;
    document.body.style.overflow = "";
  }

  nextCert(event?: Event) {
    event?.stopPropagation();
    if (this.selectedCertIndex !== null) {
      this.selectedCertIndex =
        (this.selectedCertIndex + 1) % this.certificates.length;
    }
  }

  prevCert(event?: Event) {
    event?.stopPropagation();
    if (this.selectedCertIndex !== null) {
      this.selectedCertIndex =
        (this.selectedCertIndex - 1 + this.certificates.length) %
        this.certificates.length;
    }
  }

  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.selectedCertIndex === null) return;

    if (event.key === "Escape") {
      this.closeCert();
    } else if (event.key === "ArrowRight") {
      this.nextCert();
    } else if (event.key === "ArrowLeft") {
      this.prevCert();
    }
  }

  // Swipe support
  private touchStartX = 0;
  private touchEndX = 0;

  @HostListener("touchstart", ["$event"])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener("touchend", ["$event"])
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe() {
    if (this.selectedCertIndex === null) return;

    const threshold = 50;

    if (this.touchEndX < this.touchStartX - threshold) {
      this.nextCert();
    }

    if (this.touchEndX > this.touchStartX + threshold) {
      this.prevCert();
    }
  }
}
