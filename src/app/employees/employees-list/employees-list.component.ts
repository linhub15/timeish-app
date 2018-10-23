import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from '../employee.service';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
   employees: Employee[];
  constructor(private employeeService:EmployeeService,
    public dialog: MatDialog) { }

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
    });
  }

  deleteEmployee(employee: Employee): void {
    if (!employee) { console.log("required param"); return; }
    this.employeeService.delete(employee.id).subscribe();
    const index = this.employees.indexOf(employee);
    this.employees.splice(index, 1)
  }
}
