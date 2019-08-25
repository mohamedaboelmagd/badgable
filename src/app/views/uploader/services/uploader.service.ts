import { EventEmitter, Injectable } from '@angular/core';
// import {
//   AngularFireStorage,
//   AngularFireUploadTask
// } from '@angular/fire/storage';
import * as fromHelpers from '../../../helpers';
import { NotificationService } from './notification.service';
import { from, throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';

declare var loadImage: Function;

@Injectable()
export class UploaderService {
  // unsubscribe$: Subject<void> = new Subject<void>();
  // task: AngularFireUploadTask;
  injector: EventEmitter<any> = new EventEmitter(null);
  // taskEmitter: EventEmitter<AngularFireUploadTask> = new EventEmitter(null);
  imagePathUploaded = new EventEmitter();

  constructor(
    // private storage: AngularFireStorage,
    public notification: NotificationService
  ) {}

  async getOrientation(file) {
    const that = this;
    await fromHelpers.getOrientation(file, function(orientation) {
      that.rotatingImage(file, orientation);
      return orientation;
    });
  }

  rotatingImage(file, orientation) {
    const that = this;
    loadImage(
      file,
      function(img) {
        that.injector.emit(fromHelpers.dataURItoBlob(img.toDataURL()));
        return img;
      },
      {
        orientation: orientation,
        maxWidth: 400,
        maxHeight: 400,
        minWidth: 200,
        minHeight: 200
      }
    );
  }

  upload(path, image, type) {
    // this.task = this.storage.upload(path, image, {
    //   contentType: type
    // });
    // this.taskEmitter.emit(this.task);
    // from(this.task)
    //   .pipe(
    //     filter(data => !!data)
    //     // takeUntil(this.unsubscribe$),
    //     // catchError((error: any) => error && throwError(error.json()))
    //   )
    //   .subscribe(
    //     data => {
    //       // from(
    //       //   this.storage.storage
    //       //     .ref()
    //       //     .child(path)
    //       //     .getDownloadURL()
    //       // )
    //       //   .pipe(
    //       //     // takeUntil(this.unsubscribe$),
    //       //     catchError((error: any) => throwError(error.json()))
    //       //   )
    //       //   .subscribe(
    //       //     imagePath => {
    //       //       this.imagePathUploaded.emit(imagePath);
    //       //     },
    //       //     err =>
    //       //       this.notification.translate(
    //       //         'CAN_NOT_FIND_THE_FILE_PATH',
    //       //         null,
    //       //         {
    //       //           duration: 3000
    //       //         }
    //       //       )
    //       //   );
    //     },
    //     err => {
    //       console.log(err);
    //       if (err.code === 'storage/unauthorized') {
    //         this.notification.translate(
    //           'CAN_NOT_UPLOAD_FILE_THERE_IS_A_PROBLEM_WITH_SERVER',
    //           null,
    //           {
    //             duration: 3000
    //           }
    //         );
    //       }
    //     }
    //   );
  }

  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }

  validate(filesList: FileList): boolean {
    // Validate files list
    if (filesList.length > 1) {
      // console.error('Can not upload more than one file.');
      this.notification.translate('CAN_NOT_UPLOAD_MORE_THAN_ONE_FILE', null, {
        duration: 2000
      });
      return false;
    }
    // Get first item [file]
    const file = filesList.item(0);

    // console.log('file.size :- ', file.size);
    // Validate length
    if (!file || typeof file === 'undefined') {
      // console.log('unsupported file type to upload!');
      // commented for cancel button
      // this.notification.translate('UNSUPPORTED_FILE_TYPE_TO_UPLOAD', null, {
      //   duration: 2000
      // });
      return false;
    } else if (file && file.type && file.type.split('/')[0] !== 'image') {
      // console.log('unsupported file type to upload!');
      this.notification.translate('UNSUPPORTED_FILE_TYPE_TO_UPLOAD', null, {
        duration: 2000
      });
      return false;
    } else if (file.size > 10 * 1024 * 1024) {
      this.notification.translate('FILE_SIZE_MORE_THAN_TEN_MEGA', null, {
        duration: 2000
      });
      return false;
    } else if (file.type.endsWith('gif')) {
      this.notification.translate('GIF_IMAGES_ARE_NOT_SUPPORTED', null, {
        duration: 2000
      });
      return false;
    }
    return true;
  }
}
