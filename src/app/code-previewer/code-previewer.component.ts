import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import cardsData from '../../assets/code-previewer-json/cards.json';

interface PreviewCard {
  readonly title: string;
  readonly htmlCode: string;
  readonly cssCode: string;
  readonly jsCode?: string;
  readonly download1: any;
  readonly download2: any;
  readonly download3: any;
}

@Component({
  selector: 'app-code-previewer',
  standalone: false,
  templateUrl: './code-previewer.component.html',
  styleUrls: ['./code-previewer.component.scss'],
})
export class CodePreviewerComponent {
  constructor(private readonly sanitizer: DomSanitizer) {}

  cards1: any = cardsData;
  @Input() filterText: string = ''; 
  
  readonly cards: PreviewCard[] = this.cards1 
  filteredCards: PreviewCard[] = [];

  searchText: any = '';
  
  getPreviewContent(card: PreviewCard): SafeHtml {
    const bodyStyles = `
      body { margin:0; padding:0; background:transparent; display:flex; justify-content:center; align-items:center; width:100%; height:100vh; text-align:center; }
    `;
    const html = `
      <html>
        <head><style>${bodyStyles}${card.cssCode}</style></head>
        <body>${card.htmlCode}<script>${card.jsCode || ''}<\/script></body>
      </html>
    `;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

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

  getPreviewContent1(card: PreviewCard): SafeHtml {
    const html = `
      <html>
        <head><style>${this.bodyStyles}${card.cssCode}</style></head>
        <body>
          ${card.htmlCode}
          <script>${card.jsCode || ''}<\/script>
        </body>
      </html>
    `;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}



// import { Component, OnInit } from '@angular/core';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import { AppConstants } from '../app.constant';

// interface PreviewCard {
//   readonly title: string;
//   readonly htmlCode: string;
//   readonly cssCode: string;
//   readonly jsCode?: string;
// }

// @Component({
//   selector: 'app-code-previewer',
//   standalone: false,
//   templateUrl: './code-previewer.component.html',
//   styleUrls: ['./code-previewer.component.scss']
// })
// export class CodePreviewerComponent implements OnInit {

//   searchText: string = '';
//   filteredCards: PreviewCard[] = [];

//   cards: PreviewCard[] = [
//     // paste your cool UI cards JSON here
//   ];

//   constructor(private sanitizer: DomSanitizer) {}

//   ngOnInit() {
//     this.applyFilter();
//   }

//   // ---------------------------
//   // FILTER FUNCTION
//   // ---------------------------
//   applyFilter() {
//     this.searchText = AppConstants.SEARCH_TEXT.toLowerCase();
//     this.filteredCards = this.cards.filter(card =>
//       card.title.toLowerCase().includes(this.searchText)
//     );
//   }

//   // ---------------------------
//   // SAFE HTML FOR IFRAME
//   // ---------------------------
//   getPreviewContent(card: PreviewCard): SafeHtml {
//     const bodyStyles = `
//       body {
//         margin: 0;
//         padding: 0;
//         background: transparent;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         width: 100%;
//         height: 100vh;
//         text-align: center;
//       }
//     `;
//     const html = `
//       <html>
//         <head><style>${bodyStyles}${card.cssCode}</style></head>
//         <body>${card.htmlCode}<script>${card.jsCode || ''}<\/script></body>
//       </html>
//     `;
//     return this.sanitizer.bypassSecurityTrustHtml(html);
//   }
// }
