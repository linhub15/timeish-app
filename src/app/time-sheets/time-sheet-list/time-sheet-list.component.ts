import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { TimeSheet, TimeSheetsService, EmployeeService } from '../../core';

import { AddTimeSheetDialogComponent } from '../add-time-sheet-dialog/add-time-sheet-dialog.component';
import { ReviewTimeSheetDialogComponent, ReviewDialogData } from '../review-time-sheet-dialog/review-time-sheet-dialog.component';

@Component({
  selector: 'app-time-sheet-list',
  templateUrl: './time-sheet-list.component.html',
  styleUrls: ['./time-sheet-list.component.css']
})
export class TimeSheetListComponent implements OnInit {
  timeSheets: TimeSheet[] = [];
  
  constructor(
    private apiService:TimeSheetsService,
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.apiService.list()
        .subscribe(array => this.timeSheets = array);
  }

  deleteTimeSheet(timeSheet: TimeSheet): void {
    const id = this.timeSheets.indexOf(timeSheet);
    this.timeSheets.splice(id, 1);
    this.apiService.deleteTimeSheet(timeSheet.id);
  }

  statusIcon(status: string) {
    if (status === 'Issued') { return 'panorama_fish_eye' }
    else if (status === 'Submitted') { return 'check_circle_outline' }
    else if (status === 'Approved') { return 'check_circle' }
    else { return '' }
  }
  openAddDialog(): void {
    let employees$ = this.employeeService.getEmployees(); //.subscribe(res => this.employees = res);
    const dialogRef = this.dialog.open(AddTimeSheetDialogComponent, {
      autoFocus: false,
      data: {employees$: employees$}
    });

    dialogRef.afterClosed().subscribe(timeSheet => {
      if (!timeSheet) { return }
      this.apiService.add(timeSheet)
          .subscribe(sheet => {
            sheet = new TimeSheet().deserialize(sheet);
            this.timeSheets.push(sheet);
            this.openSnackBar('Time sheet added');
          });
    })
  }

  openReviewDialog(timeSheet: TimeSheet): void {
    const dialogRef = this.dialog.open(ReviewTimeSheetDialogComponent, {
      autoFocus: false,
      data: {timeSheet: timeSheet}
    });
    // Can receive Approval, delete, or not re-issue
    dialogRef.afterClosed().subscribe((data: ReviewDialogData) => {
      if (!data) { return } // clicked outside, nothing passed through
      if (data.approved) {
        this.apiService.update(data.timeSheet).subscribe();
        this.openSnackBar('Time sheet approved');
      }
      else if (data.rejected) { } /* set it to be rejected */ 
      else if (data.deleted) {this.deleteTimeSheet(data.timeSheet)}
      else {/*Closed with no option selected*/}
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message,'',{ duration: 2500 })
  }
}