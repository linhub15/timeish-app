import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export class EmployeeDialogData {
  title: string;
  employee: Employee;
  submitAction: string;
}


@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css'],
})

export class EmployeeDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeDialogData) { }


  ngOnInit() {
  }
  
  submitEmployee() {
    this.dialogRef.close(this.data.employee);
  }
}
