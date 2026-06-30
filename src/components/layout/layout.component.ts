import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-[#080d14] flex flex-col">
      <header class="sticky top-2 z-50 px-3 sm:px-6">
        <nav class="max-w-5xl mx-auto neu-card px-4 sm:px-5 h-12 flex items-center justify-between rounded-2xl">
          <a routerLink="/" class="font-mono text-base font-bold hover:text-white transition-colors focus:outline-none">
            <span class="logo-shimmer">&lt;S/&gt;</span><span class="text-slate-500 text-sm"> Sandesh</span>
          </a>
          <div class="hidden md:flex items-center gap-6 text-xs font-mono">
            <a routerLink="/" class="text-slate-500 hover:text-slate-200 transition-colors"><span class="text-status-route">#</span>home</a>
            <a routerLink="/projects" routerLinkActive="text-slate-200" class="text-slate-500 hover:text-slate-200 transition-colors"><span class="text-status-route">#</span>projects</a>
            <a routerLink="/achievements" routerLinkActive="text-slate-200" class="text-slate-500 hover:text-slate-200 transition-colors"><span class="text-status-success">#</span>achievements</a>
            <a routerLink="/about" routerLinkActive="text-slate-200" class="text-slate-500 hover:text-slate-200 transition-colors"><span class="text-status-success">#</span>about</a>
            <a routerLink="/contact" routerLinkActive="text-slate-200" class="text-slate-500 hover:text-slate-200 transition-colors"><span class="text-status-warn">#</span>contact</a>
          </div>
          <a href="mailto:guptask0722@gmail.com" class="md:hidden font-mono text-[11px] text-slate-400 hover:text-cyan-400 transition-colors">Contact</a>
        </nav>
      </header>
      <main class="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 md:px-12 py-12 md:py-16">
        <router-outlet></router-outlet>
      </main>
      <footer class="border-t border-slate-800/40 py-6 px-4 sm:px-6">
        <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <span class="font-mono text-slate-600 text-xs">© 2025 Sandesh Kumar Gupta</span>
          <div class="flex flex-wrap justify-center gap-x-4 gap-y-1.5 font-mono text-xs text-slate-500">
            <a href="https://github.com/skgpt254" target="_blank" rel="noopener noreferrer" class="hover:text-cyan-400 transition-colors">GitHub</a>
            <a href="https://tryhackme.com/p/sandeshkgupta" target="_blank" rel="noopener noreferrer" class="hover:text-cyan-400 transition-colors">TryHackMe</a>
            <a href="https://profile.hackthebox.com/profile/019c9f97-bb38-734d-a5d5-c916377725f8" target="_blank" rel="noopener noreferrer" class="hover:text-cyan-400 transition-colors">HackTheBox</a>
            <a href="mailto:guptask0722@gmail.com" class="hover:text-cyan-400 transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </div>
  `,
})
export class LayoutComponent {}
