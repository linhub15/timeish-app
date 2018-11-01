import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { Employee } from '../../core';
import { CustomValidators } from '../../shared/custom-validators';

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
export class EmployeeDialogComponent {
  employeeForm = new FormGroup({
    firstName: new FormControl(this.data.employee.firstName, 
      [Validators.required, CustomValidators.noWhiteSpace]),
    lastName: new FormControl(this.data.employee.lastName, 
      [Validators.required, CustomValidators.noWhiteSpace]),
    email: new FormControl(this.data.employee.email, 
      [Validators.required, Validators.email, CustomValidators.noWhiteSpace]),
    hourlyPay: new FormControl(this.data.employee.hourlyPay, 
      [Validators.required, Validators.min(0), Validators.max(100)])
  });

  constructor(
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeDialogData) { }

  submitEmployee() {
    if (!this.employeeForm.valid) { return } // invalid form
    this.data.employee.deserialize(this.employeeForm.value);
    this.dialogRef.close(this.data.employee);
  }

  getErrorMessage(formControlName: string) : string {
    const control = this.employeeForm.controls[formControlName];
    if (control.hasError('required')) { return 'Required' }
    else if (control.hasError('email')) { return 'Not a valid email' }
    else if (control.hasError('min')) { return 'Must be 0 or greater'}
    else if (control.hasError('max')) { return 'Must be 100 or less'}
    else if (control.hasError('hasWhiteSpace')) { return 'No leading/trailing spaces'}
    else { return '' }
  }

  trim(formControlName: string) {
    const control = this.employeeForm.controls[formControlName];
    control.setValue(control.value.trim());
  }
}
