import { Injectable, signal } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class PortfolioDataService {
  private readonly _projects = signal<Project[]>([
    {
      slug: 'cybersecurity-portfolio',
      title: 'Personal Cybersecurity Portfolio',
      summary: 'A modern, high-performance portfolio showcasing cybersecurity expertise, achievements, and services.',
      problem: 'To effectively communicate technical skills, certifications (OSCP, CEH), and real-time achievements (TryHackMe, HackTheBox) to potential clients and employers, a static resume was insufficient. A dynamic, visually engaging platform was needed to centralize this professional identity.',
      approach: 'Built a Single Page Application (SPA) using Angular for robust component management and Tailwind CSS for a sleek, responsive, and "hacker-themed" aesthetic. Integrated specific detailed sections for services, achievements, and contact forms. key features include a custom dark mode design, responsive layouts, and optimized performance.',
      findings: 'The project successfully integrates various aspects of a professional profile into a cohesive user experience. It demonstrates not just security knowledge through content, but also full-stack development capability through execution.',
      outcome: 'A live, deployed professional portfolio that acts as a central hub for networking, showcasing a verified track record in cybersecurity and providing an easy interface for client inquiries.',
      tags: ['Angular', 'Tailwind CSS', 'Web Design', 'Portfolio'],
      date: '31 December 2025',
      imageUrl: '/assets/images/home.png',
    },
  ]);

  private readonly _skills = signal([
    { name: 'Web App Pentesting', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { name: 'Red Teaming & Adversary Emulation', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z' },
    { name: 'Network Security', icon: 'M8 11V7a4 4 0 118 0m-4 8h.01M12 20a4 4 0 100-8 4 4 0 000 8z' },
    { name: 'Secure Code Review', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' }
  ]);


  
  private readonly _certifications = signal([
    'OSCP', 'CEH', 'CISSP', 'AWS Certified Security - Specialty'
  ]);

  private readonly _clientSectors = signal([
    'Fintech', 'Cloud', 'IoT', 'SaaS'
  ]);

  projects = this._projects.asReadonly();
  skills = this._skills.asReadonly();

  certifications = this._certifications.asReadonly();
  clientSectors = this._clientSectors.asReadonly();

  private readonly _services = signal([
    {
      name: 'Web Application Penetration Testing',
      description: 'Comprehensive security assessment of your web applications to identify vulnerabilities such as SQL Injection, XSS, and more, following OWASP standards.',
    },
    {
      name: 'Red Teaming Operations',
      description: 'Simulated real-world cyber attacks to test your organization\'s detection and response capabilities, covering physical, social, and network vectors.',
    },
    {
      name: 'Cloud Security Posture Assessment',
      description: 'Detailed audit of your cloud infrastructure (AWS, Azure, GCP) to detect misconfigurations, insecure permissions, and compliance violations.',
    },
    {
      name: 'IoT & Firmware Security',
      description: 'Reverse engineering and vulnerability analysis of embedded systems, IoT devices, and firmware to prevent hardware-level compromise.',
    },
    {
      name: 'Mobile App Security Testing',
      description: 'Security testing for iOS and Android applications to uncover data leakage, insecure storage, and API vulnerabilities.',
    }
  ]);

  services = this._services.asReadonly();

  getProjectBySlug(slug: string): Project | undefined {
    return this._projects().find(p => p.slug === slug);
  }
}
