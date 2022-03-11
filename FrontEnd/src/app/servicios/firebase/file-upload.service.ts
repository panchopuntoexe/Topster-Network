import { Injectable } from '@angular/core';
import { finalize, Observable, Subscription } from 'rxjs';
import { FileUpload } from 'src/app/models/file-upload';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  
  private basePath = '/uploads';

  urlRecienteDeSubida:string=""

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage) { }

  pushFileToStorage(fileUpload: FileUpload): string {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          this.urlRecienteDeSubida = downloadURL
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
      
    ).subscribe({
      next: (data) => {
        return this.urlRecienteDeSubida
      },
      error: (error) => {
        console.error({ error });
        return " "
      }
    })
    
    return this.urlRecienteDeSubida
  }
  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
