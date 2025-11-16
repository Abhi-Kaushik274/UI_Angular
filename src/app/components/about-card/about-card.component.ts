import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-about-card',
  standalone: false,
  templateUrl: './about-card.component.html',
  styleUrl: './about-card.component.scss'
})
export class AboutCardComponent {
   @Output() close = new EventEmitter<void>();
}
