import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Employee, EmployeeService } from '../../core';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { SnackBarService } from '../../shared';
import { WarningDialogComponent } from '../../shared';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
   employees: Employee[];
  constructor(
    private employeeService:EmployeeService,
    public dialog: MatDialog,
    public snackBar: SnackBarService) { }

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
        this.snackBar.open('Added!');
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
      this.snackBar.open('Saved!');
    });
  }

  deleteEmployee(employee: Employee): void {
    if (!employee) { console.log("required param"); return; }
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      autoFocus: false,
      data: {
        title: 'Are you sure?',
        message: 'Deleting '+employee.fullName()+' will permanently delete all their time sheets too.', 
        submitAction: 'Delete'}
    });

    dialogRef.afterClosed().subscribe(submitted => {
      if (!submitted) {return}
      this.employeeService.delete(employee.id).subscribe();
      const index = this.employees.indexOf(employee);
      this.employees.splice(index, 1)
      this.snackBar.open('Deleted ' + employee.fullName() + '!');
    })
  }
}
