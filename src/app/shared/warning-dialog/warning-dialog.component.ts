import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


export interface WarningDialogData {
  title: string;
  message: string;
  submitAction: string;
  submitColor: string;
}

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.css']
})
export class WarningDialogComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<WarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WarningDialogData) { }

  ngOnInit() {
    if (!this.data.title) {this.data.title = 'Are you sure?'}
    if (!this.data.submitAction) {this.data.submitAction = 'Submit'}
    if (!this.data.submitColor) {this.data.submitColor = 'warn'}
  }
  submit() {
    this.dialogRef.close({confirmed: true});
  }

}
