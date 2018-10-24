import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { EmployeesRoutingModule } from './employees-routing.module';

/* Components */
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';

@NgModule({
  imports: [ CommonModule, SharedModule, EmployeesRoutingModule ],
  entryComponents: [EmployeeDialogComponent],
  declarations: [EmployeeListComponent, EmployeeDialogComponent]
})
export class EmployeesModule { }
