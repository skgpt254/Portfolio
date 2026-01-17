import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { CyberMemoryGameComponent } from "../../components/cyber-memory-game/cyber-memory-game.component";

interface KnowledgeCard {
  icon: string;
  title: string;
  subtitle: string;
  content: string;
  howTo: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
}

interface DeclassifiedFact {
  type: 'Myth' | 'Fact' | 'Vulnerability';
  title: string;
  truth: string;
  icon: string;
}

interface AttackScenario {
  name: string;
  description: string;
  prevention: string;
  realWorld: string;
  riskLevel: "Critical" | "High" | "Medium";
}



@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, CommonModule, CyberMemoryGameComponent],
})
export class HomeComponent {
  activeCardIndex = signal<number | null>(null);
  activeScenarioIndex = signal<number | null>(null);


  // Educational Knowledge Cards - Deep Dive Content
  knowledgeCards: KnowledgeCard[] = [
    {
      icon: "🔐",
      title: "Password Cracking Reality",
      subtitle: "How hackers break your passwords",
      content:
        '"P@$$w0rd1" takes only 4 minutes to crack using hashcat with a GPU. Dictionary attacks, rainbow tables, and brute force are standard tools.',
      howTo: [
        "1. Use 16+ character passphrases",
        "2. Enable 2FA everywhere (TOTP > SMS)",
        "3. Use a password manager like Bitwarden",
        "4. Check haveibeenpwned.com regularly",
      ],
      difficulty: "Beginner",
      tags: ["authentication", "passwords", "defense"],
    },
    {
      icon: "🕵️",
      title: "Incognito Mode Myth",
      subtitle: "What private browsing really hides",
      content:
        "Incognito only clears local history. Your ISP, employer, and websites still see everything. DNS queries leak your activity.",
      howTo: [
        "1. Use Tor Browser for true anonymity",
        "2. Configure DNS-over-HTTPS (DoH)",
        "3. Use a no-log VPN as first layer",
        "4. Disable WebRTC to prevent IP leaks",
      ],
      difficulty: "Intermediate",
      tags: ["privacy", "anonymity", "OPSEC"],
    },
    {
      icon: "🎣",
      title: "Phishing Detection",
      subtitle: "Identify social engineering attacks",
      content:
        "91% of cyberattacks begin with a phishing email. Attackers clone legitimate sites with typosquatted domains.",
      howTo: [
        "1. Hover before you click - check URLs",
        "2. Look for urgency/fear tactics",
        "3. Verify sender via separate channel",
        "4. Use email authentication (SPF/DKIM/DMARC)",
      ],
      difficulty: "Beginner",
      tags: ["social-engineering", "email-security", "awareness"],
    },
    {
      icon: "💉",
      title: "SQL Injection 101",
      subtitle: "How databases get compromised",
      content:
        "A simple ' OR 1=1-- can bypass login forms. SQLi remains in OWASP Top 10 because developers don't sanitize inputs.",
      howTo: [
        "1. Always use parameterized queries",
        "2. Implement input validation",
        "3. Use ORM frameworks properly",
        "4. Apply principle of least privilege",
      ],
      difficulty: "Advanced",
      tags: ["web-security", "database", "OWASP"],
    },
  ];

  // Real Attack Scenarios
  attackScenarios: AttackScenario[] = [
    {
      name: "Ransomware Attack",
      description: "Malware encrypts all files, demands cryptocurrency payment",
      prevention: "Offline backups, network segmentation, EDR solutions",
      realWorld: "Colonial Pipeline 2021: $4.4M ransom, fuel shortage",
      riskLevel: "Critical",
    },
    {
      name: "Man-in-the-Middle",
      description: "Attacker intercepts communication between two parties",
      prevention: "Use HTTPS, VPN on public WiFi, certificate pinning",
      realWorld: 'Public WiFi "Evil Twin" attacks steal credentials daily',
      riskLevel: "High",
    },
    {
      name: "Zero-Day Exploit",
      description: "Attack using unknown vulnerability before patch exists",
      prevention: "Defense in depth, behavior-based detection, quick patching",
      realWorld: "Log4Shell 2021: Affected millions of Java applications",
      riskLevel: "Critical",
    },
    {
      name: "Credential Stuffing",
      description: "Using leaked credentials to access multiple accounts",
      prevention: "Unique passwords per site, 2FA, breach monitoring",
      realWorld: "3.2B credentials leaked in COMB breach (2021)",
      riskLevel: "High",
    },
  ];



  // Quick Security Tips
  quickTips = [
    {
      icon: "🔒",
      tip: "Enable 2FA on all accounts today",
      action: "Use authenticator apps, not SMS",
    },
    {
      icon: "🔄",
      tip: "Update your software now",
      action: "Patches fix known vulnerabilities",
    },
    {
      icon: "💾",
      tip: "Backup using 3-2-1 rule",
      action: "3 copies, 2 media types, 1 offsite",
    },
    {
      icon: "🔍",
      tip: "Audit your digital footprint",
      action: "Google yourself, remove old accounts",
    },
  ];

  // Statistics
  stats = [
    { value: "$4.45M", label: "Avg. data breach cost", trend: "+15%" },
    { value: "39s", label: "Attack frequency", trend: "Every 39 seconds" },
    { value: "95%", label: "Human error breaches", trend: "Preventable" },
    { value: "277", label: "Days to detect breach", trend: "Average" },
  ];



  toggleCard(index: number) {
    if (this.activeCardIndex() === index) {
      this.activeCardIndex.set(null);
    } else {
      this.activeCardIndex.set(index);
    }
  }

  toggleScenario(index: number) {
    if (this.activeScenarioIndex() === index) {
      this.activeScenarioIndex.set(null);
    } else {
      this.activeScenarioIndex.set(index);
    }
  }



  getRiskLevelClass(level: string): string {
    switch (level) {
      case "Critical":
        return "bg-red-500/20 text-red-400 border-red-500/50";
      case "High":
        return "bg-orange-500/20 text-orange-400 border-orange-500/50";
      default:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
    }
  }

  getDifficultyClass(level: string): string {
    switch (level) {
      case "Beginner":
        return "bg-green-500/20 text-green-400";
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-red-500/20 text-red-400";
    }
  }
}
