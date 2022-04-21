import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {FileUploadService} from "../services/file-upload.service";
import {UserService} from "../services/user.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-upload-file-client-uploading',
  templateUrl: './upload-file-client-uploading.component.html',
  styleUrls: ['./upload-file-client-uploading.component.css','./externalSCSS.scss']
})
export class UploadFileClientUploadingComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  constructor(private uploadService: FileUploadService) { }
  ngOnInit(): void {

    // recuperer la liste des comptables associe a cet client
    // requete "/api/auth/client/comptable"
    // mettre la liste des comptables dans un tableau pour afficher dans liste deroulante
    // comptable.user.id != comptable.id
    throw new Error('Method not implemented.');
  }

  saveFile()
  {
    let file=this.currentFile;
    let idDemande="";
    let recipentId;
    let type="";

    //this.uploadService.uploadFile(file,idDemande)
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.uploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          });
      }
      this.selectedFiles = undefined;
    }
  }
}
