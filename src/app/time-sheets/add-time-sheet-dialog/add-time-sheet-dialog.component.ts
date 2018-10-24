import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Employee } from '../../core/models/employee.model';
import { TimeSheet } from '../../core/models/time-sheet.model';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

export interface DialogData {
  employees$: Observable<Employee[]>;
}

@Component({
  selector: 'app-add-time-sheet-dialog',
  templateUrl: './add-time-sheet-dialog.component.html',
  styleUrls: ['./add-time-sheet-dialog.component.css']
})
export class AddTimeSheetDialogComponent implements OnInit{
  employees: Employee[] = [];
  employeeInput = new FormControl();
  filteredOptions$: Observable<Employee[]>;

  constructor( 
    public dialogRef: MatDialogRef<AddTimeSheetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      
    }

  ngOnInit() {
    this.data.employees$.subscribe(array => this.employees = array);
    this.filteredOptions$ = this.employeeInput.valueChanges
        .pipe(
          startWith<string | Employee>(''),
          map(value => typeof value === 'string' ? value : value.fullName()),
          map(value => value ? this._filter(value) : this.employees.slice())
        )
  }

  private _filter(value: string): Employee[] {
    const filterValue = value.toLowerCase();
    return this.employees.filter(
        option => option.fullName().toLocaleLowerCase().indexOf(filterValue) === 0);
  }

  addNewTimeSheet() {
    // Use employee name from employeeInput, search for employeeID that matches that
    let timeSheet = new TimeSheet();
    this.filteredOptions$.subscribe(array => timeSheet.employeeId = array[0].id);
    this.dialogRef.close(timeSheet);      // Pass the timeSheet as result
  }

  displayFullName(employee?: Employee): string | undefined{
    return employee ? employee.fullName() : undefined;
  }

  autoComplete(): void {
    if (!this.employeeInput.value) {return}
    let firstMatch = this._filter(this.employeeInput.value)[0];
    typeof firstMatch != 'undefined' ? this.employeeInput.setValue(firstMatch) : null;
  }
}
