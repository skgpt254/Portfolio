import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  HostListener,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID,
  ElementRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private dataService = inject(PortfolioDataService);
  private elRef       = inject(ElementRef);

  readonly currentYear = new Date().getFullYear();

  projects       = this.dataService.projects;
  skills         = this.dataService.skills;
  socialLinks    = this.dataService.socialLinks;
  certifications = this.dataService.certifications;

  activeSection  = signal('home');
  typedText      = signal('');
  showCursor     = signal(true);
  mobileMenuOpen = signal(false);

  // FIX: switched to compressed WebP (14MB → 780KB total) — this was the real cause of slow loading
  readonly certImages = [
    'assets/images/certifications/1c.webp',
    'assets/images/certifications/2c.webp',
    'assets/images/certifications/3c.webp',
    'assets/images/certifications/4c.webp',
    'assets/images/certifications/5c.webp',
    'assets/images/certifications/6c.webp',
    'assets/images/certifications/7c.webp',
    'assets/images/certifications/8c.webp',
    'assets/images/certifications/9c.webp',
    'assets/images/certifications/10c.webp',
    'assets/images/certifications/11c.webp',
    'assets/images/certifications/12c.webp',
    'assets/images/certifications/13c.webp',
    'assets/images/certifications/14c.webp',
    'assets/images/certifications/15c.webp',
    'assets/images/certifications/16c.webp',
    'assets/images/certifications/17c.webp',
    'assets/images/certifications/18c.webp',
  ];
  selectedCertIndex = signal<number | null>(null);

  // FIX: "Show More" pagination — only render a batch at a time instead of all 18 at once
  private readonly CERT_BATCH_SIZE = 6;
  certVisibleCount = signal(this.CERT_BATCH_SIZE);

  visibleCertImages() {
    return this.certImages.slice(0, this.certVisibleCount());
  }

  showMoreCerts() {
    this.certVisibleCount.update(n => Math.min(n + this.CERT_BATCH_SIZE, this.certImages.length));
    // BUG FIX: newly rendered cert cards (the next batch) don't exist in the DOM yet when
    // initScrollReveal() ran in ngAfterViewInit, so the IntersectionObserver never knew
    // about them. Without being observed, they keep the default .reveal opacity:0 and
    // never receive .visible — appearing to "not load". Re-scan after Angular paints
    // the new batch so the new cards get observed (and become visible immediately,
    // since the user just asked to see them).
    //
    // Using a DOUBLE requestAnimationFrame rather than a single one: in zoneless mode,
    // a signal write schedules change detection on its own internal timer, which can
    // still be pending when our first rAF callback fires — racing it. By waiting two
    // frames we guarantee Angular has already committed the new DOM nodes before we
    // query for them.
    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => requestAnimationFrame(() => this.observeNewRevealElements()));
    }
  }

  showLessCerts() {
    this.certVisibleCount.set(this.CERT_BATCH_SIZE);
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById('certifications-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // FIX 2: scroll progress for top progress bar (0–100)
  scrollProgress = signal(0);

  openCert(i: number) {
    this.selectedCertIndex.set(i);
    if (isPlatformBrowser(this.platformId)) document.body.style.overflow = 'hidden';
  }
  closeCert() {
    this.selectedCertIndex.set(null);
    if (isPlatformBrowser(this.platformId)) document.body.style.overflow = '';
  }
  nextCert(e?: Event) {
    e?.stopPropagation();
    const c = this.selectedCertIndex();
    if (c !== null) this.selectedCertIndex.set((c + 1) % this.certImages.length);
  }
  prevCert(e?: Event) {
    e?.stopPropagation();
    const c = this.selectedCertIndex();
    if (c !== null) this.selectedCertIndex.set((c - 1 + this.certImages.length) % this.certImages.length);
  }

  // Color-codes a tech tag chip by category — ML/AI = violet, systems/kernel = orange,
  // security/testing = green, everything else falls back to neutral skeu-tag.
  // Each return includes the base 'skeu-tag' class since [class] binding replaces
  // the static class attribute rather than merging with it.
  tagColor(tag: string): string {
    const t = tag.toLowerCase();
    if (/ml|machine learning|onnx|ai/.test(t)) return 'skeu-tag skeu-tag-special';
    if (/ebpf|kernel|go|c\b|linux|bpf|docker/.test(t)) return 'skeu-tag skeu-tag-route';
    if (/security|scapy|network/.test(t)) return 'skeu-tag skeu-tag-success';
    return 'skeu-tag';
  }

  // BUG FIX: [class]="'reveal-d' + n" was silently overwriting the static class="..."
  // attribute on the same element (Angular's [class] binding replaces rather than merges
  // with a co-located static class attribute). Cards built this way lost their base
  // classes — including .reveal itself — so dynamically-added cards (e.g. "Show More"
  // certificates) had nothing for the IntersectionObserver to find, and rendered
  // permanently invisible (opacity: 0, see .reveal in styles.css). This helper always
  // returns the full combined class string so nothing gets silently dropped.
  revealClass(base: string, index: number, mod = 4): string {
    const delay = (index % mod) + 1;
    return `${base} reveal reveal-d${delay}`;
  }

  private fullText  = 'CyberSecurity Researcher & CTF Player';
  private typeIndex = 0;
  private cursorInterval: ReturnType<typeof setInterval> | null = null;
  private observer: IntersectionObserver | null = null;

  readonly sections = ['home', 'projects', 'skills', 'about', 'contact'];

  // FIX: emoji replaced with line-icon SVG path data — trophy / medal / globe / scan icons
  readonly achievements = [
    // Trophy icon (cup + handles + base) — a real trophy shape instead of the previous generic shield
    { icon: 'M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0', label: '7th / 9,000+ Teams', sub: 'Hack IITK CTF, IIT Kanpur 2026', color: 'alert'   },
    // Medal icon (circular medallion + hanging ribbon tails) — a real medal shape instead of the previous vague circle+stem
    { icon: 'M18 8a6 6 0 11-12 0 6 6 0 0112 0zM15.477 12.89L17 22l-5-3-5 3 1.523-9.11', label: '5th Place', sub: 'Scythe CTF — IIT Roorkee 2025', color: 'warn'    },
    { icon: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0zM3.6 9h16.8M3.6 15h16.8M12 3a14.5 14.5 0 010 18M12 3a14.5 14.5 0 000 18', label: 'Top 2% Globally', sub: 'TryHackMe — 3M+ Users', color: 'info' },
    { icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'APCSIP-2026', sub: 'Amroha Police Cyber Intern', color: 'success' },
  ];

  // FIX: emoji removed — each skill now maps to a matching line-icon SVG path
  readonly skillIcons: Record<string, string> = {
    // globe/web — pentesting targets web apps
    'Web App Pentesting':     'M21 12a9 9 0 11-18 0 9 9 0 0118 0zM3.6 9h16.8M3.6 15h16.8M12 3a14.5 14.5 0 010 18M12 3a14.5 14.5 0 000 18',
    // terminal/chip — kernel & systems level
    'eBPF & Kernel Security':  'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 7h10v10H7V7z',
    // network nodes
    'Network Security':       'M9 17H4a2 2 0 01-2-2V9a2 2 0 012-2h5m6 0h5a2 2 0 012 2v6a2 2 0 01-2 2h-5M9 17v3m6-3v3m-9 0h12M9 7V4m6 3V4M9 7h6',
    // bug
    'Bug Bounty Hunting':     'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    // cloud
    'Cloud Security':         'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
    // magnifier — forensics
    'Digital Forensics':      'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    // circuit/cpu — ML
    'ML for Security':        'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 7h10v10H7V7zm3 3h4v4h-4v-4z',
    // refresh/cycle — reverse engineering
    'Reverse Engineering':    'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    // crosshair/target — red teaming
    'Red Teaming':            'M12 22a10 10 0 100-20 10 10 0 000 20zm0-4a6 6 0 100-12 6 6 0 000 12zm0-4a2 2 0 100-4 2 2 0 000 4z',
    // eye — OSINT
    'OSINT':                  'M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    // factory — ICS/SCADA
    'ICS/SCADA Security':     'M3 21V10l6 4v-4l6 4v-4l5 3.5V21H3zm3-3h.01M11 18h.01M16 18h.01',
    // phone — mobile security
    'Mobile App Security':    'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
  };

  // FIX: emoji removed — each tool now maps to a real brand-style line icon (generic, not literal logo)
  readonly toolStack = [
    { name: 'Burp Suite', icon: 'M12 2L3 7v6c0 5.25 3.75 9.74 9 11 5.25-1.26 9-5.75 9-11V7l-9-5zm0 4.5L17.5 9 12 11.5 6.5 9 12 6.5z' },          // shield-target — interception proxy
    { name: 'Metasploit', icon: 'M13 2L3 14h7l-1 8 11-14h-7l1-6z' },                                                                                // bolt — exploit framework
    { name: 'Nmap',       icon: 'M9 17H4a2 2 0 01-2-2V9a2 2 0 012-2h5m6 0h5a2 2 0 012 2v6a2 2 0 01-2 2h-5M9 17v3m6-3v3m-9 0h12M9 7V4m6 3V4M9 7h6' }, // network nodes — port scanning
    { name: 'Wireshark',  icon: 'M3 12h4l2-8 4 16 2-8h6' },                                                                                         // waveform/pulse — packet capture
    { name: 'Kali Linux', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 7h10v10H7V7z' },                                            // terminal/chip — OS / distro
    { name: 'OWASP ZAP',  icon: 'M12 22a10 10 0 100-20 10 10 0 000 20zm0-4a6 6 0 100-12 6 6 0 000 12zm0-4a2 2 0 100-4 2 2 0 000 4z' },              // crosshair — active scanning
    { name: 'Python',     icon: 'M9.75 3.104v5.714a2.25 2.25 0 002.25 2.25h5.25M9.75 3.104H4.5A2.25 2.25 0 002.25 5.354v13.5A2.25 2.25 0 004.5 21h9.75A2.25 2.25 0 0016.5 18.75V11.07M9.75 3.104l6.75 7.965' },  // file/script
    { name: 'Go',         icon: 'M9.75 3.104v5.714a2.25 2.25 0 002.25 2.25h5.25M9.75 3.104H4.5A2.25 2.25 0 002.25 5.354v13.5A2.25 2.25 0 004.5 21h9.75A2.25 2.25 0 0016.5 18.75V11.07M9.75 3.104l6.75 7.965' },
    { name: 'eBPF',       icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 7h10v10H7V7zm3 3h4v4h-4v-4z' },                              // chip — kernel hooks
    { name: 'Docker',     icon: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25M9 7.5V4.875c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V7.5' }, // container box
    { name: 'Git',        icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 7h10v10H7V7zm3 3l4 4m0-4l-4 4' },                            // branch/merge style
    { name: 'Autopsy',    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },                                                                     // magnifier — investigation
  ];

  readonly dotGrid = Array<number>(25).fill(0);

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.startTyping();
    this.cursorInterval = setInterval(() => this.showCursor.update(v => !v), 530);
    this.initScrollReveal();
    this.updateProgress(); // init on load
  }

  ngOnDestroy() {
    if (this.cursorInterval !== null) { clearInterval(this.cursorInterval); this.cursorInterval = null; }
    if (this.observer) { this.observer.disconnect(); this.observer = null; }
    if (isPlatformBrowser(this.platformId)) document.body.style.overflow = '';
  }

  private startTyping() {
    const type = () => {
      if (this.typeIndex < this.fullText.length) {
        this.typedText.update(t => t + this.fullText[this.typeIndex]);
        this.typeIndex++;
        setTimeout(type, 65);
      }
    };
    setTimeout(type, 900);
  }

  private initScrollReveal() {
    this.observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.observer?.unobserve(entry.target);
        }
      }),
      { threshold: 0.1 }
    );
    this.observeNewRevealElements();
  }

  // Scans for any .reveal element not yet tracked and starts observing it.
  // Called on init, and again after dynamic content (e.g. "Show More" certs) is added.
  private observeNewRevealElements() {
    if (!this.observer) return;
    const targets: NodeListOf<Element> = this.elRef.nativeElement.querySelectorAll('.reveal:not(.visible)');
    targets.forEach((el: Element) => {
      this.observer!.observe(el);
      // SAFETY NET: certificates (and any other .reveal content) must never stay
      // permanently invisible — if for any reason the IntersectionObserver doesn't
      // fire within a second (e.g. the element was already fully in view but the
      // browser's observer callback got delayed, or a future code change adds
      // content the observer wasn't told about), force it visible as a fallback.
      // This makes "content never shows up" structurally impossible going forward.
      setTimeout(() => el.classList.add('visible'), 1000);
    });
  }

  scrollTo(sectionId: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private updateProgress() {
    if (!isPlatformBrowser(this.platformId)) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress.set(docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0);
  }

  @HostListener('window:scroll')
  onScroll() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.updateProgress();
    for (const id of this.sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) { this.activeSection.set(id); break; }
      }
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') { this.mobileMenuOpen.set(false); this.closeCert(); }
    if (this.selectedCertIndex() === null) return;
    if (e.key === 'ArrowRight') this.nextCert();
    if (e.key === 'ArrowLeft')  this.prevCert();
  }

  private touchStartX = 0;
  @HostListener('touchstart', ['$event'])
  onTouchStart(e: TouchEvent) { this.touchStartX = e.changedTouches[0].screenX; }
  @HostListener('touchend', ['$event'])
  onTouchEnd(e: TouchEvent) {
    if (this.selectedCertIndex() === null) return;
    const dx = e.changedTouches[0].screenX - this.touchStartX;
    if (dx < -50) this.nextCert();
    if (dx >  50) this.prevCert();
  }
}
