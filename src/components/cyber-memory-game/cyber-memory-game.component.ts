import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Card {
  id: number;
  icon: string;
  title: string;
  fact: string;
  isFlipped: boolean;
  isMatched: boolean;
}

@Component({
  selector: 'app-cyber-memory-game',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full max-w-4xl mx-auto p-4 md:p-8 bg-slate-900/50 rounded-3xl border border-cyan-500/20 shadow-2xl backdrop-blur-sm relative overflow-hidden my-12">
      
      <!-- Background Decorations -->
      <div class="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
         <div class="absolute -top-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
         <div class="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style="animation-duration: 4s"></div>
      </div>

      <!-- Header -->
      <div class="text-center mb-8 relative z-10">
        <div class="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-sm mb-4">
          MISSION: RESTORE THE MAINFRAME
        </div>
        <h2 class="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-2">
          Cyber Memory Protocol
        </h2>
        <p class="text-slate-400 text-sm md:text-base max-w-lg mx-auto">
          Match the cybersecurity pairs to decrypt the data! 
          <span class="block mt-1 text-cyan-300 font-semibold">Moves: {{ moves() }}</span>
        </p>
      </div>

      <!-- Game Grid -->
      <div class="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 relative z-10 perspective-1000">
        @for (card of cards(); track card.id) {
          <div 
            (click)="flipCard(card)"
            class="aspect-square cursor-pointer group relative preserve-3d transition-transform duration-500"
            [class.rotate-y-180]="card.isFlipped || card.isMatched"
            [class.pointer-events-none]="card.isFlipped || card.isMatched || isProcessing()">
            
            <!-- Card Back -->
            <div class="absolute inset-0 backface-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border-2 border-slate-700 flex items-center justify-center shadow-lg group-hover:border-cyan-500/50 group-hover:shadow-cyan-500/20 transition-all z-20">
              <span class="text-4xl opacity-50">🔒</span>
            </div>

            <!-- Card Front -->
            <div class="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl border-2 border-cyan-400 flex flex-col items-center justify-center shadow-lg z-10">
              <span class="text-4xl md:text-5xl mb-2 filter drop-shadow-md">{{ card.icon }}</span>
              <span class="text-[10px] md:text-xs font-bold text-cyan-100 uppercase tracking-widest">{{ card.title }}</span>
            </div>
          </div>
        }
      </div>

      <!-- Victory / Fact Overlay -->
      <div *ngIf="matchedFact()" class="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-fade-in">
        <div class="bg-gradient-to-b from-slate-800 to-slate-900 border border-cyan-500 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden">
          <!-- Fun Confetti/Glow behind -->
          <div class="absolute inset-0 bg-cyan-500/10 blur-xl"></div>
          
          <div class="relative z-10">
            <div class="text-6xl mb-4 animate-bounce">
              {{ matchedIcon() }}
            </div>
            <h3 class="text-xl md:text-2xl font-bold text-white mb-2">Match Found!</h3>
            <p class="text-cyan-300 font-medium text-base mb-6">{{ matchedFact() }}</p>
            
            <button 
              (click)="closeOverlay()"
              class="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-all text-sm uppercase tracking-wide">
              Continue Mission
            </button>
          </div>
        </div>
      </div>

      <!-- Win Screen -->
      <div *ngIf="gameWon()" class="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-md">
        <div class="text-center relative max-w-md mx-auto">
          <div class="text-7xl md:text-8xl mb-6 animate-pulse">🏆</div>
          <h2 class="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
            MISSION ACCOMPLISHED!
          </h2>
          <p class="text-slate-300 text-base md:text-lg mb-8">
            System Secured in <span class="text-cyan-400 font-bold text-2xl">{{ moves() }}</span> moves!
          </p>
          <button 
            (click)="resetGame()"
            class="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-cyan-500/50 hover:scale-110 transition-all font-mono uppercase tracking-wider">
            Reboot System (Play Again)
          </button>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .preserve-3d { transform-style: preserve-3d; }
    .backface-hidden { backface-visibility: hidden; }
    .rotate-y-180 { transform: rotateY(180deg); }
    .perspective-1000 { perspective: 1000px; }
    .animate-fade-in { animation: fadeIn 0.3s ease-out; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `]
})
export class CyberMemoryGameComponent {
  cards: WritableSignal<Card[]> = signal([]);
  moves: WritableSignal<number> = signal(0);
  flippedCards: WritableSignal<Card[]> = signal([]);
  matchedFact: WritableSignal<string | null> = signal(null);
  matchedIcon: WritableSignal<string | null> = signal(null);
  gameWon: WritableSignal<boolean> = signal(false);
  isProcessing: WritableSignal<boolean> = signal(false);

  // Game Data
  private readonly cardData = [
    { icon: '🎣', title: 'Phishing', fact: 'Phishing is a trick simply like a fake email to steal your secrets!' },
    { icon: '🛡️', title: 'Firewall', fact: 'A Firewall is a digital wall that keeps bad hackers out!' },
    { icon: '🦠', title: 'Malware', fact: 'Malware is a "sick" computer bug that makes devices run slow.' },
    { icon: '🔐', title: 'Encryption', fact: 'Encryption turns your messages into secret codes!' },
    { icon: '🍪', title: 'Cookies', fact: 'Not for eating! These cookies track where you go online.' },
    { icon: '🕵️', title: 'Spyware', fact: 'Spyware watches what you do, just like a sneaky spy!' }
  ];

  constructor() {
    this.resetGame();
  }

  resetGame() {
    // Duplicate and Shuffle
    const deck = [...this.cardData, ...this.cardData]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        ...item,
        id: index,
        isFlipped: false,
        isMatched: false
      }));
    
    this.cards.set(deck);
    this.moves.set(0);
    this.flippedCards.set([]);
    this.matchedFact.set(null);
    this.gameWon.set(false);
    this.isProcessing.set(false);
  }

  flipCard(card: Card) {
    // Basic validation
    if (this.isProcessing() || card.isFlipped || card.isMatched) return;

    // Flip the card
    this.cards.update(current => 
      current.map(c => c.id === card.id ? { ...c, isFlipped: true } : c)
    );

    const flipped = [...this.flippedCards(), card];
    this.flippedCards.set(flipped);

    if (flipped.length === 2) {
      this.checkMatch(flipped[0], flipped[1]);
    }
  }

  checkMatch(card1: Card, card2: Card) {
    this.isProcessing.set(true);
    this.moves.update(m => m + 1);

    if (card1.title === card2.title) {
      // MATCH!
      setTimeout(() => {
        this.cards.update(current => 
          current.map(c => (c.id === card1.id || c.id === card2.id) ? { ...c, isMatched: true } : c)
        );
        this.matchedFact.set(card1.fact);
        this.matchedIcon.set(card1.icon);
        this.flippedCards.set([]);
        this.isProcessing.set(false);
        
        // Check win
        if (this.cards().every(c => c.isMatched)) {
           // Wait for overlay to be closed if it's open, but we handle it in closeOverlay mostly.
           // However, if we show overlay for every match, user sees match -> reads fact -> closes -> matched cards stay.
           // If it's the LAST match, we might want to transition to Win Screen after closing overlay.
           // The closeOverlay function handles this logic.
        }
      }, 500);
    } else {
      // NO MATCH
      setTimeout(() => {
        this.cards.update(current => 
          current.map(c => (c.id === card1.id || c.id === card2.id) ? { ...c, isFlipped: false } : c)
        );
        this.flippedCards.set([]);
        this.isProcessing.set(false);
      }, 1000); // 1s wait to let user see "oops"
    }
  }

  closeOverlay() {
    this.matchedFact.set(null);
    // Check if that was the last match
    if (this.cards().every(c => c.isMatched)) {
        this.gameWon.set(true);
    }
  }
}
