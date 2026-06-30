import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Custom cursor: a small dot that tracks the pointer exactly, plus a larger
 * ring that eases toward it with a short lag for a "designed" feel. Expands
 * and highlights when hovering anything clickable. Automatically disabled on
 * touch/coarse-pointer devices and when the user has prefers-reduced-motion
 * set, so it never interferes with mobile/tablet use or accessibility needs.
 *
 * BUG FIXES from the previous version:
 * 1. The base CSS centers the cursor on the pointer via
 *    `transform: translate3d(-50%, -50%, 0)`. The old code overwrote
 *    `style.transform` directly with `translate3d(Xpx, Ypx, 0)`, which
 *    REPLACED that centering offset instead of adding to it — so the dot/ring
 *    rendered with their top-left corner at the pointer instead of being
 *    centered on it, making the whole cursor look visibly offset and janky.
 *    Fix: the -50% centering is now folded into the same translate3d call.
 * 2. The ring's eased position (ringX/ringY) started at (0, 0), so on the
 *    very first mouse move the ring would visibly fly in from the top-left
 *    corner of the screen instead of appearing at the pointer.
 *    Fix: ring position snaps to the pointer position the first time it's
 *    shown, then eases normally after that.
 * 3. `mouseover` doesn't reliably bubble for all nested SVG/icon children in
 *    every browser and missed elements added after the initial listener
 *    attached in some edge cases. Switched to `pointerover`, which is the
 *    modern, more reliable equivalent and also covers pen/touch uniformly.
 */
@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #ring class="cursor-ring is-hidden" aria-hidden="true"></div>
    <div #dot class="cursor-dot is-hidden" aria-hidden="true"></div>
  `,
})
export class CustomCursorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('dot', { static: true }) dotRef!: ElementRef<HTMLDivElement>;
  @ViewChild('ring', { static: true }) ringRef!: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);

  private rafId: number | null = null;
  private mouseX = 0;
  private mouseY = 0;
  private ringX = 0;
  private ringY = 0;
  private enabled = false;
  private hasPosition = false;

  private onMove = (e: MouseEvent) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    // FIX 2: on the very first move, snap the ring straight to the pointer
    // instead of letting it ease in all the way from (0, 0).
    if (!this.hasPosition) {
      this.ringX = this.mouseX;
      this.ringY = this.mouseY;
      this.hasPosition = true;
    }

    // FIX 1: keep the -50% centering offset baked into every transform write.
    this.dotRef.nativeElement.style.transform =
      `translate3d(-50%, -50%, 0) translate3d(${this.mouseX}px, ${this.mouseY}px, 0)`;

    if (!this.enabled) this.show();
  };

  private onLeaveWindow = () => this.hide();
  private onEnterWindow = () => { if (this.hasPosition) this.show(); };

  // FIX 3: pointerover is more reliable than mouseover for nested elements.
  private onOver = (e: PointerEvent) => {
    const target = e.target as HTMLElement;
    const interactive = target.closest(
      'a, button, [role="button"], input, textarea, select, .skeu-cert, [tabindex]'
    );
    this.ringRef.nativeElement.classList.toggle('is-active', !!interactive);
  };

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    // Respect reduced motion and skip entirely on touch / coarse-pointer devices
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (prefersReducedMotion || !isFinePointer) return;

    document.documentElement.classList.add('has-custom-cursor');
    window.addEventListener('mousemove', this.onMove, { passive: true });
    window.addEventListener('pointerover', this.onOver, { passive: true });
    document.addEventListener('mouseleave', this.onLeaveWindow);
    document.addEventListener('mouseenter', this.onEnterWindow);

    const loop = () => {
      // Ease the ring toward the dot's position for a soft trailing effect
      this.ringX += (this.mouseX - this.ringX) * 0.18;
      this.ringY += (this.mouseY - this.ringY) * 0.18;
      // FIX 1: same centering fix applied to the ring's transform.
      this.ringRef.nativeElement.style.transform =
        `translate3d(-50%, -50%, 0) translate3d(${this.ringX}px, ${this.ringY}px, 0)`;
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  private show() {
    this.enabled = true;
    this.dotRef.nativeElement.classList.remove('is-hidden');
    this.ringRef.nativeElement.classList.remove('is-hidden');
  }

  private hide() {
    this.dotRef.nativeElement.classList.add('is-hidden');
    this.ringRef.nativeElement.classList.add('is-hidden');
  }

  ngOnDestroy() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    window.removeEventListener('mousemove', this.onMove);
    window.removeEventListener('pointerover', this.onOver);
    document.removeEventListener('mouseleave', this.onLeaveWindow);
    document.removeEventListener('mouseenter', this.onEnterWindow);
    document.documentElement.classList.remove('has-custom-cursor');
  }
}
