import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

import * as fromServices from '../../services';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploaderComponent implements OnInit {
  imageUrl: string;
  isHovering: boolean;
  @Output() imageEmitter = new EventEmitter<string>();
  constructor(private uploader: fromServices.UploaderService) {}

  ngOnInit() {}

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  async startUpload(filesList: FileList) {
    if (!this.uploader.validate(filesList)) {
      return;
    }
    const file = filesList.item(0);
    console.log(file);
    await this.toBase64(file).then((img: string) => (this.imageUrl = img));
    this.imageEmitter.emit(this.imageUrl);
  }

  errorHandler(event) {
    event.target.src = 'assets/default.png';
  }

  toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    })
}
