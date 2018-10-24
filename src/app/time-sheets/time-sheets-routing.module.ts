import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TimeSheetComponent } from './time-sheet/time-sheet.component';
import { TimeSheetListComponent } from './time-sheet-list/time-sheet-list.component';


const timeSheetsRoutes: Routes = [
  { path: 'timesheets', component: TimeSheetListComponent, data: {title: 'Time Sheets'} },
  { path: 'timesheets/:id', component: TimeSheetComponent, data: {title: 'Time Sheet Detail'} }
]

@NgModule({
  imports: [ RouterModule.forChild(timeSheetsRoutes) ],
  exports: [ RouterModule ]
})
export class TimeSheetsRoutingModule { }
