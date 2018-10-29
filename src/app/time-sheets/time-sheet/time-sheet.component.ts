import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { TimeSheetsService, TimeSheetForm } from '../../core';


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
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const id: number = +this.route.snapshot.paramMap.get('id');
    const timeSheet$ = this.apiService.get(id);
    timeSheet$.subscribe(timeSheet => 
        this.timeSheetForm = new TimeSheetForm(timeSheet));
  }


  save() {
    this.timeSheetForm.saveChanges(this.apiService);
    this.snackBar.open('Time sheet saved!', '',{duration: 2500});
  }

  submit() {
    this.timeSheetForm.submitTimeSheet(this.apiService);
    this.snackBar.open('Time sheet submitted for approval', '',{duration: 2500});
  }
}