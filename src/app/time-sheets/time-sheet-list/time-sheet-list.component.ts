import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AddTimeSheetDialogComponent } from '../add-time-sheet-dialog/add-time-sheet-dialog.component';
import { TimeSheet, TimeSheetsService, EmployeeService } from '../../core';
import { ReviewTimeSheetDialogComponent, ReviewDialogData } from '../review-time-sheet-dialog/review-time-sheet-dialog.component';
import { SnackBarService, WarningDialogComponent } from '../../shared';

@Component({
  selector: 'app-time-sheet-list',
  templateUrl: './time-sheet-list.component.html',
  styleUrls: ['./time-sheet-list.component.css']
})
export class TimeSheetListComponent implements OnInit {
  timeSheets: TimeSheet[];
  
  constructor(
    private timeSheetService:TimeSheetsService,
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    public snackBar: SnackBarService) { }

  ngOnInit() {
    this.timeSheetService.list()
        .subscribe(array => this.timeSheets = array);
  }

  
  statusIcon(status: string): string {
    if (status === 'Issued') { return 'panorama_fish_eye' }
    else if (status === 'Submitted') { return 'check_circle_outline' }
    else if (status === 'Approved') { return 'check_circle' }
    else { return '' }
  }

  openAddDialog(): void {
    let employees$ = this.employeeService.getEmployees();
    const dialogRef = this.dialog.open(AddTimeSheetDialogComponent, {
      autoFocus: false,
      data: {employees$: employees$}
    });

    dialogRef.afterClosed().subscribe(timeSheet => {
      if (!timeSheet) { return }
      this.timeSheetService.add(timeSheet)
          .subscribe(sheet => {
            this.timeSheets.push(sheet);
            this.snackBar.open('Added');
          });
    })
  }

  openReviewDialog(timeSheet: TimeSheet): void {
    const dialogRef = this.dialog.open(ReviewTimeSheetDialogComponent, {
      autoFocus: false,
      data: {timeSheet: timeSheet}
    });

    dialogRef.afterClosed().subscribe((data: ReviewDialogData) => {
      if (!data) { return } // clicked outside, nothing passed through
      if (data.approved) {
        this.timeSheetService.update(data.timeSheet).subscribe();
        this.snackBar.open('Time sheet approved');
      }
      else if (data.rejected) { } /* set it to be rejected */ 
      else if (data.deleted) {this.deleteTimeSheet(data.timeSheet);}
      else {/*Closed with no option selected*/}
    });
  }

  deleteTimeSheet(timeSheet: TimeSheet) {
    if (!timeSheet) { return }
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      autoFocus: false,
      data: {
        title: 'Are you sure?',
        message: 'Deleting the time sheet is permanent.',
        submitAction: 'Delete' }
    });

    dialogRef.afterClosed().subscribe(submitted => {
      if (!submitted) {return}
      this.timeSheetService.deleteTimeSheet(timeSheet.id);
      const index = this.timeSheets.indexOf(timeSheet);
      this.timeSheets.splice(index, 1);
      this.snackBar.open('Deleted time sheet!');
    })
  }

}