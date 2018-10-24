import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { Employee, EmployeeService } from '../../core';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
   employees: Employee[];
  constructor(
    private employeeService:EmployeeService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.employeeService.getEmployees()
        .subscribe(array => this.employees = array);
  }

  openAddDialog(): void {
    const employee = new Employee();
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      autoFocus: false,
      data: {
        title: 'Add Employee',
        employee: employee,
        submitAction: 'Add'
      }
    });

    dialogRef.afterClosed().subscribe(employee => {
      if (!employee) { return }
      this.employeeService.add(employee)
        .subscribe(e => this.employees.push(e))
        this.snackBar.open('Added','', {duration: 2500});
    })
  }
  openEditDialog(employee: Employee): void {
    let employeeContainer = new Employee().deserialize(employee);
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      autoFocus: false,
      data: {
        title: 'Edit Employee',
        employee: employeeContainer,
        submitAction: 'Save'
      }
    });
    dialogRef.afterClosed().subscribe(dialogEmployee => {
      if (!dialogEmployee) {return}
      this.employeeService.update(dialogEmployee).subscribe();
      let index = this.employees.indexOf(employee);
      this.employees[index] = dialogEmployee;
      this.snackBar.open('Saved','', {duration: 2500});
    });
  }

  deleteEmployee(employee: Employee): void {
    if (!employee) { console.log("required param"); return; }
    this.employeeService.delete(employee.id).subscribe();
    const index = this.employees.indexOf(employee);
    this.employees.splice(index, 1)
    this.snackBar.open('Deleted','', {duration: 2500});
  }
}
