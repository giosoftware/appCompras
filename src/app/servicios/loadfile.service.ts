import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Archivo } from '../upload/file.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadfileService {
  private basePath = '/uploads';
  constructor(public angularFireDatabase: AngularFireDatabase) {}

  deleteUpload(upload: Archivo) {
    console.log('deleteUpload');
    console.log(upload);
    this.deleteFileData(upload.key)
      .then(() => {
        this.deleteFileStorage(upload.name);
      })
      .catch(error => console.log(error));
  }
  private deleteFileData(key: string) {
    console.log('deleteFileData with key: ' + key);
    return this.angularFireDatabase.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }

  getUploads() {
    return this.angularFireDatabase
      .list(this.basePath)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => ({
            key: a.key,
            name: a.payload.val()['name'],
            url: a.payload.val()['url']
          }))
        )
      );

    // return this.angularFireDatabase.list(this.basePath);
  }

  pushUpload(upload: Archivo) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef
      .child(`${this.basePath}/${upload.file.name}`)
      .put(upload.file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        // upload in progress
        upload.progress =
          (uploadTask.snapshot.bytesTransferred /
            uploadTask.snapshot.totalBytes) *
          100;
      },
      error => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        uploadTask.snapshot.ref.getDownloadURL().then(url => {
          upload.url = url;
          upload.name = upload.file.name;
          this.saveFileData(upload);
        });
      }
    );
  }

  private saveFileData(upload: Archivo) {
    this.angularFireDatabase.list(`${this.basePath}/`).push(upload);
  }
}
