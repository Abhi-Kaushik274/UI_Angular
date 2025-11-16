import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-upload-card',
  standalone: false,
  templateUrl: './upload-card.component.html',
  styleUrl: './upload-card.component.scss'
})
export class UploadCardComponent {
  fileName: string = '';
  @Output() close = new EventEmitter<void>();

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
  }
}
