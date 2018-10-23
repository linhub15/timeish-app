import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TimeSheetsRoutingModule } from './time-sheets-routing.module';

/* Components */
import { TimeSheetListComponent } from './time-sheet-list/time-sheet-list.component';
import { TimeSheetComponent } from './time-sheet/time-sheet.component';
import { ActivityComponent } from './activity/activity.component';
import { AddTimeSheetDialogComponent } from './add-time-sheet-dialog/add-time-sheet-dialog.component';
import { ReviewTimeSheetDialogComponent } from './review-time-sheet-dialog/review-time-sheet-dialog.component';


@NgModule({
  imports: [ CommonModule, SharedModule, TimeSheetsRoutingModule ],
  entryComponents: [AddTimeSheetDialogComponent, ReviewTimeSheetDialogComponent],
  declarations: [
    TimeSheetListComponent,
    TimeSheetComponent,
    ActivityComponent,
    AddTimeSheetDialogComponent,
    ReviewTimeSheetDialogComponent,
  ]
})
export class TimeSheetsModule { }
