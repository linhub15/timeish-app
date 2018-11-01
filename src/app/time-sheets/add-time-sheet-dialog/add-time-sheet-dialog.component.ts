import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Employee, TimeSheet } from '../../core';
import { CustomValidators } from '../../shared';


export interface DialogData {
  employees$: Observable<Employee[]>;
}


/** control.value must equal 'Employee' 
 * Set to invalid if typeof control.value == string
 * If the employee exists, control.value is of type 'Employee'
 */
export const isStringValidator: ValidatorFn 
    = (control: FormControl): ValidationErrors | null => {
  return typeof control.value === 'string' ? {'isString': true} : null;
}

@Component({
  selector: 'app-add-time-sheet-dialog',
  templateUrl: './add-time-sheet-dialog.component.html',
  styleUrls: ['./add-time-sheet-dialog.component.css']
})
export class AddTimeSheetDialogComponent implements OnInit{
  employees: Employee[] = [];
  newTimeSheetForm = new FormGroup({
    employeeInput: new FormControl('', 
    [Validators.required, CustomValidators.isString])
  })
  filteredOptions$: Observable<Employee[]>;

  constructor( 
    public dialogRef: MatDialogRef<AddTimeSheetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    const employeeControl = this.newTimeSheetForm.controls['employeeInput'];
    this.data.employees$.subscribe(array => {
      this.employees = array;
      this.filteredOptions$ = employeeControl.valueChanges
      .pipe(
        startWith<string | Employee>(''),
        map(value => typeof value === 'string' ? value : value.fullName()),
        map(value => value ? this._filter(value, this.employees) : this.employees.slice()),
      )
    });
  }

  private _filter(value: string, employees: Employee[]): Employee[] {
    if (typeof value !== 'string') { return [] }
    const filterValue = value.toLowerCase();
    return employees.filter(
        option => option.fullName().toLocaleLowerCase().indexOf(filterValue) === 0);
  }

  addNewTimeSheet() {
    if (this.newTimeSheetForm.invalid) { return }
    const value: Employee = this.newTimeSheetForm.controls['employeeInput'].value;
    const timeSheet = new TimeSheet(1, value.id);
    timeSheet.employeeId = value.id;
    this.dialogRef.close(timeSheet); 
  }

  displayFullName(employee?: Employee): string | Employee{
    return employee ? employee.fullName() : employee;
  }

  getErrorMessage(controlName: string): string {
    const control = this.newTimeSheetForm.controls[controlName];
    if (control.hasError('required')) {return 'Required' }
    else if (control.hasError('isString')) { return 'Employee not found'}
    else { return 'Invalid' }
  }

  autoComplete(): void {
    const employeeInput = this.newTimeSheetForm.controls['employeeInput'];
    if (!employeeInput.value) {return}
    const firstMatch = this._filter(employeeInput.value, this.employees)[0];
    typeof firstMatch != 'undefined' ? employeeInput.setValue(firstMatch) : null;
  }
}
