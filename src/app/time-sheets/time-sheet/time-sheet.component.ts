import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TimeSheetsService, TimeSheetForm } from '../../core';
import { SnackBarService, WarningDialogComponent, WarningDialogData } from '../../shared';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.css']
})
export class TimeSheetComponent implements OnInit {

  public timeSheetForm: TimeSheetForm = new TimeSheetForm();

  constructor(
    private route: ActivatedRoute,
    private apiService: TimeSheetsService,
    public dialog: MatDialog,
    public snackBar: SnackBarService
  ) { }

  ngOnInit() {
    const id: number = +this.route.snapshot.paramMap.get('id');
    const timeSheet$ = this.apiService.get(id);
    timeSheet$.subscribe(timeSheet => 
        this.timeSheetForm = new TimeSheetForm(timeSheet));
  }

  save() {
    const saved = this.timeSheetForm.saveChanges(this.apiService);
    if (saved) {
      this.snackBar.open('Saved!');
    }
    else { this.snackBar.open('Validation Errors')}
    
  }

  submit() {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      autoFocus: false,
      data: {
        message: 'No more changes can be made after submitting.',
        submitColor: 'primary'
      }
    });
    dialogRef.afterClosed().subscribe(submitted => {
      if (!submitted) {return}
      this.timeSheetForm.submitTimeSheet(this.apiService);
      this.snackBar.open('Submitted!');
    })
  }
}