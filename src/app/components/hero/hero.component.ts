import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


interface Card {
  title: string;
  content: string;
  codeHtml: string;
  codeAngular: string;
  codeReact?: string;
  download1: string;
  download2: string;
  download3: string;
}

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']  // **note styleUrls (plural)**
})
export class HeroComponent {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  safeUrl!: SafeResourceUrl;
  
  fullscreenCard: Card | null = null;
  codeContent: string = ''; // stores previewed code

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient, private sanitizer: DomSanitizer) {}

  // scrollLeft() {
  //   this.scrollContainer.nativeElement.scrollBy({
  //     left: -300,
  //     behavior: 'smooth'
  //   });
  // }

  // scrollRight() {
  //   this.scrollContainer.nativeElement.scrollBy({
  //     left: 300,
  //     behavior: 'smooth'
  //   });
  // }



  dots: number[] = [];
  activeDot = 0;
  cardWidth = 270; // card width + gap

  ngAfterViewInit() {
    this.calculateDots();
  }

  calculateDots() {
    const container = this.scrollContainer.nativeElement;
    const visibleWidth = container.offsetWidth;
    const totalWidth = container.scrollWidth;

    const totalDots = Math.ceil(totalWidth / visibleWidth);
    this.dots = Array(totalDots).fill(0);
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -this.cardWidth, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: this.cardWidth, behavior: 'smooth' });
  }

  scrollToDot(index: number) {
    const container = this.scrollContainer.nativeElement;
    const scrollPosition = index * container.offsetWidth;
    container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    this.activeDot = index;
  }

  onScroll() {
    const container = this.scrollContainer.nativeElement;
    const scrollLeft = container.scrollLeft;
    const visibleWidth = container.offsetWidth;

    this.activeDot = Math.round(scrollLeft / visibleWidth);
  }

  cards: Card[] = [
    {
      title: 'Toggle Button 1',
      content: 'Preview ToggleButton component code',
      codeHtml: 'previewcode/ToggleButtonCode/HTML/html-code.html',
      codeAngular: 'assets/preview-code/ToggleButtonCode/angular-code.ts',
      codeReact: 'assets/preview-code/ToggleButtonCode/angular-code.html',
      download1: 'app/previewcode/ToggleButtonCode/html-code.html',
      download2: 'assets/preview-code/ToggleButtonCode/angular-code.ts',
      download3: 'assets/preview-code/ToggleButtonCode/angular-code.html',
    },
    {
      title: 'Toggle Button 2',
      content: 'Preview ToggleButton component code',
      codeHtml: 'previewcode/ToggleButtonCode/HTML/html-code.html',
      codeAngular: 'assets/preview-code/ToggleButtonCode/angular-code.ts',
      codeReact: 'assets/preview-code/ToggleButtonCode/angular-code.html',
      download1: 'app/previewcode/ToggleButtonCode/html-code.html',
      download2: 'assets/preview-code/ToggleButtonCode/angular-code.ts',
      download3: 'assets/preview-code/ToggleButtonCode/angular-code.html',
    },
    {
      title: 'Toggle Button 3',
      content: 'Preview ToggleButton component code',
      codeHtml: 'previewcode/ToggleButtonCode/HTML/html-code.html',
      codeAngular: 'assets/preview-code/ToggleButtonCode/angular-code.ts',
      codeReact: 'assets/preview-code/ToggleButtonCode/angular-code.html',
      download1: 'app/previewcode/ToggleButtonCode/html-code.html',
      download2: 'assets/preview-code/ToggleButtonCode/angular-code.ts',
      download3: 'assets/preview-code/ToggleButtonCode/angular-code.html',
    }
  ];
  
  // openCard(card: Card) {
  //   this.fullscreenCard = card;
  
  //   // ✅ Securely load iframe preview (for actual visual preview)
  //   this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(card.codeHtml);
  
  //   console.log('📄 Preview file path:', card.codeHtml);
  
  //   // ✅ Load raw HTML code text (for code view)
  //   this.http.get(card.codeHtml, { responseType: 'text' }).subscribe({
  //     next: (data) => {
  //       this.codeContent = data;
  //       this.cdr.detectChanges(); // refresh the template binding
  //     },
  //     error: (err) => {
  //       console.error('❌ Error loading HTML code:', err);
  //       this.codeContent = 'Error: Unable to load preview file.';
  //     }
  //   });
  // }

  openCard(card: Card) {
    this.fullscreenCard = card;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(card.codeHtml);
  
    this.http.get(card.codeHtml, { responseType: 'text' }).subscribe({
      next: (data) => {
        this.codeContent = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ Error loading HTML code:', err);
        this.codeContent = 'Error: Unable to load preview file.';
      }
    });
  }
  
  

  closeCard() {
    this.fullscreenCard = null;
    this.codeContent = '';
  }
}