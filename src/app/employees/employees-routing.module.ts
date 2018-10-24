import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { EmployeeListComponent } from "./employee-list/employee-list.component";

const employeeRoutes: Routes = [
  { path: 'employees', component: EmployeeListComponent, data: {title: 'Employees'} },
]

@NgModule({
  imports: [ RouterModule.forChild(employeeRoutes) ],
  exports: [ RouterModule ]
})
export class EmployeesRoutingModule { };