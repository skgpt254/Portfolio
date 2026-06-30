import { Injectable, signal } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {

  private readonly _projects = signal<Project[]>([
    {
      slug: 'erds-ebpf-ransomware-defense-system',
      title: 'eRDS — eBPF Ransomware Defense System',
      summary:
        'A kernel-level eBPF tool that intercepts file-write syscalls in real time, performs Shannon entropy analysis, and kills ransomware processes before widespread encryption can occur.',
      problem:
        'Traditional antivirus solutions are reactive — they rely on known signatures and miss zero-day ransomware. A proactive, behavioural approach operating at the Linux kernel level was needed to stop encryption attacks before damage occurs.',
      approach:
        'Engineered a CO-RE eBPF probe attached to sys_enter_write and sys_enter_pwrite64, capturing 512-byte samples per event via a 16 MB ring buffer. A Go user-space agent performs 3-tier Shannon entropy classification (0–7.0 safe, 7.0–7.5 suspicious, 7.5+ high-risk), then validates with a second-stage ONNX Random Forest classifier. On confirmed ransomware, SIGKILL is dispatched immediately via Linux tracepoints. Built-in safety guards protect PID 0, PID 1, and the agent itself.',
      findings:
        'Reliably detects high-entropy write events characteristic of encryption. The ONNX classifier reduces false positives from legitimate high-entropy tools (zip, ffmpeg, gpg). Hypervisor fallback via /proc/PID/fd handles VirtualBox memory isolation edge cases. All 16 unit tests pass for entropy logic and safety guards.',
      outcome:
        'A portable, production-ready ransomware defense tool running on any Linux 5.8+ kernel without recompilation (CO-RE). Stops simulated ransomware (openssl rand) in under 10ms from first write event.',
      tags: ['Go', 'eBPF', 'C', 'Linux Kernel', 'ONNX', 'Python', 'ML'],
      date: '2026',
      imageUrl: 'assets/images/home.webp',
      githubUrl: 'https://github.com/skgpt254/Cyber_Mini-Project',
    },
    {
      slug: 'packetdive-network-detection-response',
      title: 'PacketDive — Network Detection & Response Engine',
      summary:
        'A high-performance Python NDR engine using deep packet inspection, BPF pre-filtering, and Isolation Forest ML to detect real-time network anomalies with zero packet loss.',
      problem:
        'Enterprise NDR platforms like Darktrace are expensive and opaque. A transparent, open-source alternative was needed that combines traditional DPI with unsupervised ML — flagging exfiltration spikes without requiring labelled training data.',
      approach:
        'Built a Producer-Consumer architecture with a dedicated capture thread using Scapy + kernel-level BPF pre-filtering (store=False to prevent RAM exhaustion). The consumer feeds three modules: an L7 Analyzer (HTTP metadata, DNS queries, TLS SNI extraction), an Anomaly Analyzer (sliding time-window port-scan detection), and an ML Analyzer (Isolation Forest run every N seconds on per-IP feature vectors). A decoupled Rich-based TUI dashboard tails the JSONL log asynchronously for zero UI blocking.',
      findings:
        'Zero packet loss under normal network loads. BPF pre-filtering reduced noise by 30–40%. Isolation Forest correctly flagged sudden data-transfer spikes (exfiltration simulation via dd/nc) with no labelled training data. Port scan detection triggered reliably on rapid multi-port Nmap scans.',
      outcome:
        'A lightweight, fully open-source NDR prototype deployable on any Python 3.9+ host. Demonstrates that unsupervised ML delivers dynamic anomaly detection comparable to commercial solutions at zero cost.',
      tags: ['Python', 'Scapy', 'Machine Learning', 'BPF', 'Scikit-Learn', 'Network Security'],
      date: '2026',
      imageUrl: 'assets/images/home.webp',
      githubUrl: 'https://github.com/skgpt254/PacketDive',
    },
    {
      slug: 'cybersecurity-portfolio',
      title: 'Personal Cybersecurity Portfolio',
      summary:
        'A modern, high-performance Angular 20 SPA showcasing cybersecurity expertise, CTF achievements, and security services — built with Signals, zoneless change detection, and Tailwind CSS.',
      problem:
        'A static resume cannot communicate live platform rankings, certifications, and interactive project demos to clients and employers. A dynamic, verifiable platform was needed.',
      approach:
        'Built with Angular 20 standalone components, OnPush change detection, and Angular Signals throughout. Features include a hacker-themed dark UI, typing animation hero, fixed sidebars, scroll-spy nav, interactive Cyber Memory Game, certification gallery with keyboard/swipe navigation, and Formspree-integrated contact form. Deployed on Vercel with clean URL routing via vercel.json SPA rewrites.',
      findings:
        'Migrated from legacy *ngIf/*ngFor to modern @if/@for control flow. Resolved Vercel 404 by flattening nested repo subfolder to root and adding SPA rewrite config. Fixed setInterval memory leak, invalid class bindings, and missing isPlatformBrowser SSR guards.',
      outcome:
        'Live deployed portfolio serving as a professional hub for networking and client inquiries, demonstrating both security knowledge and modern full-stack development capability.',
      tags: ['Angular 20', 'Tailwind CSS', 'TypeScript', 'Vercel', 'Web Security'],
      date: '2025',
      imageUrl: 'assets/images/home.webp',
      githubUrl: 'https://github.com/skgpt254/NewPortfolio',
    },
  ]);

  private readonly _skills = signal([
    { name: 'Web App Pentesting',     icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { name: 'Red Teaming',            icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z' },
    { name: 'eBPF & Kernel Security', icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18' },
    { name: 'Network Security',       icon: 'M8 11V7a4 4 0 118 0m-4 8h.01M12 20a4 4 0 100-8 4 4 0 000 8z' },
    { name: 'Reverse Engineering',    icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4' },
    { name: 'OSINT',                  icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    { name: 'Bug Bounty Hunting',     icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { name: 'Cloud Security',         icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' },
    { name: 'Digital Forensics',      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { name: 'ML for Security',        icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { name: 'ICS/SCADA Security',     icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
    { name: 'Mobile App Security',    icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
  ]);

  private readonly _services = signal([
    {
      name: 'Web Application Penetration Testing',
      icon: '🌐',
      description:
        'Comprehensive security assessment following OWASP Top 10 — covering SQLi, XSS, IDOR, SSRF, Auth Bypass, and business-logic flaws. Delivered with a structured report including PoC and remediation steps.',
    },
    {
      name: 'Red Teaming Operations',
      icon: '🎯',
      description:
        "Simulated adversary campaigns testing your organisation's real-world detection and response capability across physical, social engineering, and network vectors.",
    },
    {
      name: 'Network Detection & Response',
      icon: '📡',
      description:
        'Deep packet inspection, traffic anomaly detection, and real-time exfiltration alerting using custom NDR tooling (PacketDive). BPF pre-filtering + Isolation Forest ML.',
    },
    {
      name: 'Cloud Security Posture Assessment',
      icon: '☁️',
      description:
        'Audit of AWS/Azure/GCP infrastructure for misconfigurations, insecure IAM policies, exposed storage, and compliance gaps against CIS Benchmarks.',
    },
    {
      name: 'CTF & Security Training',
      icon: '🏁',
      description:
        'Hands-on CTF coaching for teams and individuals covering web exploitation, reverse engineering, cryptography, OSINT, and ICS/SCADA challenges.',
    },
    {
      name: 'Bug Bounty Consulting',
      icon: '🐛',
      description:
        'Guidance on structuring or improving a bug bounty programme — scope definition, triage workflows, severity classification, and researcher engagement.',
    },
  ]);

  private readonly _socialLinks = signal([
    { label: 'GitHub',     url: 'https://github.com/skgpt254',                                                     icon: 'github'     },
    { label: 'LinkedIn',   url: 'https://www.linkedin.com/in/sandeshkgupta/',                                      icon: 'linkedin'   },
    { label: 'TryHackMe',  url: 'https://tryhackme.com/p/sandeshkgupta',                                          icon: 'tryhackme'  },
    { label: 'HackTheBox', url: 'https://profile.hackthebox.com/profile/019c9f97-bb38-734d-a5d5-c916377725f8',    icon: 'hackthebox' },
    { label: 'LeetCode',   url: 'https://leetcode.com/u/sandeshkgpt/',                                            icon: 'leetcode'   },
  ]);

  private readonly _contactInfo = signal({
    email:    'guptask0722@gmail.com',
    phone:    '+91 9956979696',
    location: 'Lucknow, Uttar Pradesh, India',
  });

  // FIX #7: Added Google Cybersecurity Professional Certificate (was in resume PDF but missing from service)
  private readonly _certifications = signal([
    'Google Cybersecurity Professional Certificate — Google',
    'Certified LLM Security Professional (CLLMSP) — Red Team Leaders',
    'Certified Online Fraud Prevention Specialist (COFPS) — Hack & Fix Academy',
    'Intro to Penetration Testing — Security Blue Team',
    'AI for Cybersecurity — LinkedIn Learning',
    'Full Stack Web Development — Internshala',
    'Python — HackerRank',
  ]);

  projects       = this._projects.asReadonly();
  skills         = this._skills.asReadonly();
  services       = this._services.asReadonly();
  socialLinks    = this._socialLinks.asReadonly();
  contactInfo    = this._contactInfo.asReadonly();
  certifications = this._certifications.asReadonly();

  getProjectBySlug(slug: string): Project | undefined {
    return this._projects().find((p) => p.slug === slug);
  }
}
