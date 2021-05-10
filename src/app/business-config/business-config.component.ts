import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-business-config',
  templateUrl: './business-config.component.html',
  styleUrls: ['./business-config.component.css']
})
export class BusinessConfigComponent implements OnInit {
  displayedColumns: string[] = ['zone', 'unit', 'name', 'range2', 'icon',];
  dataSource;
  constructor(private dialog: MatDialog, private service: ConfigService) { }

  ngOnInit() {
    this.fetchBUs()
  }

  fetchBUs() {
    this.service.getBUs().subscribe(res => this.dataSource = res)
  }


  openEditDialog(bu): void {
    let data = { ...bu }
    const dialogRef = this.dialog.open(BUEditDialog, {
      height: '320px',
      width: '650px',
      data: data,
    });
    dialogRef.afterClosed().subscribe(result => {
      let bus = this.dataSource.filter(bsut => bsut._id != bu._id)
      bus.push(result)
      let conflict = this.service.isConflict(bus)
      if (conflict) alert("There is conflit in the range.")
      if (result && !conflict) {

        this.service.updateBU(result).subscribe(res => {
          this.fetchBUs()
          this.service.openSnackBar('Configuration Updated', 'Success!')
        })
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(BUAddDialog, {
      height: '320px',
      width: '650px',
      data: { name: null, plc_range: [], range: null, zone: null, site: null },
    });
    dialogRef.afterClosed().subscribe(result => {
      let bus = [...this.dataSource]
      bus.push(result)
      let conflict = this.service.isConflict(bus)
      if (conflict) alert("There is conflit in the range.")
      if (result && !conflict) {
        this.service.createBU(result).subscribe(res => {
          this.fetchBUs()
          this.service.openSnackBar('New Buisness Unit Added', 'Success!')
        })
      }
    });
  }

  delete(element) {
    if (confirm("Are you sure you want to delete?")) {
      this.service.deleteBU(element).subscribe(res => {
        this.fetchBUs()
        this.service.openSnackBar('Buisness Unit Deleted', 'Success!')
      })
    }
  }
}


@Component({
  selector: 'bu-edit-dialog',
  templateUrl: 'bu-edit-dialog.html',
  styleUrls: ['./business-config.component.css']
})

export class BUEditDialog {
  err_msg = "";
  constructor(
    public dialogRef: MatDialogRef<BUEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  onNoClick(): void {

    this.dialogRef.close(null);
  }

  save() {
    if (this.data.name && this.data.zone && this.data.site && this.data.range) {
      let b = true;
      for (let i of this.data.range.split(',')) {
        if (i.indexOf('-') == -1) b = b && !isNaN(i)
        else if (/^[0-9]+[-][0-9]+$/.test(i)) b = b && Number(i.split('-')[0]) < Number(i.split('-')[1])
        else b = false
      }
      if (b) this.dialogRef.close(this.data);
      else this.err_msg = "Please fill the range properly."
    }
    else this.err_msg = "Please fill all required fields"
  }

  isRange(range) {
    if (range.indexOf('-') == -1 && !isNaN(range)) return true
    else if (/^[0-9]+[-][0-9]+$/.test(range)) {
      if (Number(range.split('-')[0]) < Number(range.split('-')[1])) return true
      else return false
    }
    else return false
  }

}

@Component({
  selector: 'bu-add-dialog',
  templateUrl: 'bu-add-dialog.html',
  styleUrls: ['./business-config.component.css']
})

export class BUAddDialog {
  err_msg = "";
  constructor(
    public dialogRef: MatDialogRef<BUAddDialog>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  save() {
    if (this.data.name && this.data.zone && this.data.site && this.data.range) {
      let b = true;
      for (let i of this.data.range.split(',')) {
        b = b && this.isRange(i);
      }
      if (b) this.dialogRef.close(this.data);
      else this.err_msg = "Please fill the range properly."
    }
    else this.err_msg = "Please fill all required fields"
  }

  isRange(range) {
    if (range.indexOf('-') == -1 && !isNaN(range)) return true
    else if (/^[0-9]+[-][0-9]+$/.test(range)) {
      if (Number(range.split('-')[0]) < Number(range.split('-')[1])) return true
      else return false
    }
    else return false
  }

}
