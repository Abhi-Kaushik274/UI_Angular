import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import cardsData from '../../../assets/code-previewer-json/cards.json';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export interface Card {
  title: string;
  content: string;
  codeHtml: string;
  codeAngular: string;
  codeReact?: string;
  download1: string;
  download2: string;
  download3: string;
}

export interface PreviewCard {
  title: string;
  htmlCode: string;
  cssCode: string;
  jsCode?: string;
  download1: any;
  download2: any;
  download3: any;
}

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  fullscreenCard: PreviewCard | null = null;
  safeUrl!: SafeResourceUrl;
  codeContent: string = '';

  cards: PreviewCard[] = cardsData;
  filteredCards: PreviewCard[] = [];

  dots: number[] = [];
  activeDot = 0;
  cardWidth = 270;
  isGridLayout = false;

  private readonly bodyStyles = `
    body {
      margin: 0;
      padding: 0;
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100vh;
      text-align: center;
    }
  `;

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.filteredCards = [...this.cards];
  }

  toggleLayout() {
    this.isGridLayout = !this.isGridLayout;
  }
  
  // ---------------------------
  // SCROLL NAVIGATION
  // ---------------------------
  ngAfterViewInit() {
    this.calculateDots();
  }

  private calculateDots() {
    if (!this.scrollContainer) return;

    const container = this.scrollContainer.nativeElement;
    const totalDots = Math.ceil(container.scrollWidth / container.offsetWidth);
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
    container.scrollTo({ left: index * container.offsetWidth, behavior: 'smooth' });
    this.activeDot = index;
  }

  onScroll() {
    const container = this.scrollContainer.nativeElement;
    this.activeDot = Math.round(container.scrollLeft / container.offsetWidth);
  }

  // ---------------------------
  // FULLSCREEN PREVIEW
  // ---------------------------
  openCard(card: PreviewCard) {
    this.fullscreenCard = card;
    this.generateDownloads(card);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(card.htmlCode);

    this.http.get(card.htmlCode, { responseType: 'text' }).subscribe({
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

  // ---------------------------
  // SAFE HTML PREVIEW FOR IFRAME
  // ---------------------------
  getPreviewContent(card: PreviewCard): SafeHtml {
    const html = `
      <html>
        <head><style>${this.bodyStyles}${card.cssCode}</style></head>
        <body>${card.htmlCode}<script>${card.jsCode || ''}<\/script></body>
      </html>
    `;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  htmlUrl: string | null = null;
  cssUrl: string | null = null;
  jsUrl: string | null = null;

  generateDownloads(card: any) {
    if (!card) return;
  
    // HTML file
    if (card.htmlCode) {
      const htmlBlob = new Blob([card.htmlCode], { type: 'text/html' });
      this.htmlUrl = URL.createObjectURL(htmlBlob);
    }
  
    // CSS file
    if (card.cssCode) {
      const cssBlob = new Blob([card.cssCode], { type: 'text/css' });
      this.cssUrl = URL.createObjectURL(cssBlob);
    }
  
    // JS file (optional)
    if (card.jsCode) {
      const jsBlob = new Blob([card.jsCode], { type: 'text/javascript' });
      this.jsUrl = URL.createObjectURL(jsBlob);
    }
  }
  
  downloadCombinedCode(card: any) {
    if (!card) return;
  
    // convert title → lowercase + hyphens
    const titleFormatted = card.title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');
  
    const zipName = `${titleFormatted}-html-code`; // without .zip here
  
    const zip = new JSZip();
    const folder = zip.folder(zipName);
  
    folder!.file("index.html", card.htmlCode || "<!-- No HTML Code Provided -->");
    folder!.file("style.css", card.cssCode || "/* No CSS Code Provided */");
    folder!.file("script.js", card.jsCode || "// No JS Code Provided */");
  
    zip.generateAsync({ type: 'blob' }).then((content: Blob) => {
      saveAs(content, `${zipName}.zip`);
    });
  }
}