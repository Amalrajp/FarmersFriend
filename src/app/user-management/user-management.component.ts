import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicesService } from '../services/services.service';
import { ConfigService } from '../services/config.service';
import { AuthService } from '../services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ['username', 'designation', 'icon'];
  dataSource

  constructor(private dialog: MatDialog, private signin: AuthService, private service: ServicesService, private service2: ConfigService) { }

  ngOnInit() {
    this.getProfiles()
  }

  getProfiles() {
    this.service.getProfiles({}).subscribe(res => this.dataSource = res)
  }

  deleteUser(user) {
    if (confirm('Are you sure, you want to delete the user?')) {
      this.service.deleteUser(user).subscribe(res => {
        this.getProfiles()
        this.service2.openSnackBar('User  Removed', 'Success!')
      })
    }
  }

  openEditDialog(user): void {
    let data = { ...user }
    const dialogRef = this.dialog.open(UserEditDialog, {
      width: '400px',
      data: data,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.updateUser(result[0]).subscribe((res) => {
          this.service2.openSnackBar('User details Updated', 'Success!')
          this.getProfiles()
        },
          (err) => {
            console.log(err)
            alert(err.error.message || 'Something went wrong')
          }
        )
        if (result[1]) this.service.uploadImage(result[1]).subscribe(result => 1);
      }
    });
  }
  openAddDialog(): void {
    let data = { username: null, role: null }
    const dialogRef = this.dialog.open(UserAddDialog, {
      width: '400px',
      data: data,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.signin.register(result[0]).subscribe((res) => {
          this.service2.openSnackBar('New user added', 'Success!')
          this.getProfiles()
        },
          (err) => {
            console.log(err)
            alert(err.error.message || 'Something went wrong')
          }
        )
        if (result[1]) this.service.uploadImage(result[1]).subscribe(result => 1);
      }
    });
  }
}

@Component({
  selector: 'user-edit-dialog',
  templateUrl: 'user-edit-dialog.html',
  styleUrls: ['./user-management.component.css']
})

export class UserEditDialog {

  fd = new FormData();
  selectedFile: File = null;
  image = null;

  constructor(
    public dialogRef: MatDialogRef<UserEditDialog>,
    private service: ServicesService,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data,
    @Inject(DOCUMENT) private document) {

    if (this.data.image) {
      this.service.getImage(this.data.image).subscribe(result => {
        let imageURL = URL.createObjectURL(result);
        this.image = this.sanitizer.bypassSecurityTrustResourceUrl(imageURL);
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  createFormData(event) {

    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile.type.split('/')[0] != 'image') {
      alert("The selected file is not an image");
      this.selectedFile = null;
    }

    else if (this.selectedFile.size > 100000) {
      alert("The image size is large. It should be less than 100kb");
      this.selectedFile = null;
    }

    else {
      let imageURL = URL.createObjectURL(this.selectedFile);
      this.image = this.sanitizer.bypassSecurityTrustResourceUrl(imageURL);
    }

  }

  deleteImage() {
    this.selectedFile = null;
    this.data.image = null;
    this.image = null;
    this.document.getElementById('fileInput').value='';
  }

  save() {
    if (this.selectedFile) {

      let fileName = this.selectedFile.name
      var ext = fileName.substr(fileName.lastIndexOf('.') + 1);
      fileName = this.data.username + '.' + ext;
      this.data.image = fileName
      this.fd.append('file', this.selectedFile, fileName);
    }
    this.dialogRef.close([this.data, this.fd]);
  }

}

@Component({
  selector: 'user-add-dialog',
  templateUrl: 'user-add-dialog.html',
  styleUrls: ['./user-management.component.css']
})

export class UserAddDialog {
  err = false;
  image = null;
  selectedFile: File = null;
  fd = new FormData();

  constructor(
    public dialogRef: MatDialogRef<UserAddDialog>,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data,
    @Inject(DOCUMENT) private document) {

  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  createFormData(event) {
    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile.type.split('/')[0] != 'image') {
      alert("The selected file is not an image");
      this.selectedFile = null;
    }

    else if (this.selectedFile.size > 100000) {
      alert("The image size is large. It should be less than 100kb");
      this.selectedFile = null;
    }
    else {
      let imageURL = URL.createObjectURL(this.selectedFile);
      this.image = this.sanitizer.bypassSecurityTrustResourceUrl(imageURL);
    }
  }

  deleteImage() {
    this.selectedFile = null;
    this.data.image = null;
    this.image = null;
    this.document.getElementById('fileInput').value='';
  }

  save() {
    if (this.selectedFile) {
      let fileName = this.selectedFile.name;
      var ext = fileName.substr(fileName.lastIndexOf('.') + 1);
      fileName = this.data.username + '.' + ext;
      this.data.image = fileName;
      this.fd.append('file', this.selectedFile, fileName);
    }
    if (this.data.role && this.data.username) this.dialogRef.close([this.data, this.fd]);
    else this.err = true
  }

}