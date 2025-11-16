import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showUploadCard = false;
  showAboutCard = false;

  toggleUploadCard() {
    this.showUploadCard = !this.showUploadCard;
    this.showAboutCard = false; // Optionally close About card
  }

  toggleAboutCard() {
    this.showAboutCard = !this.showAboutCard;
    this.showUploadCard = false; // Optionally close Upload card
  }

  closeUploadCard() {
    this.showUploadCard = false;
  }

  closeAboutCard() {
    this.showAboutCard = false;
  }
}
