import { Component, OnInit, ViewChildren, QueryList, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { TimeSheet } from '../../core/models/time-sheet.model';
import { ActivatedRoute } from '@angular/router';
import { TimeSheetsService } from '../time-sheets.service';
import { ActivityComponent } from '../activity/activity.component';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.css']
})
export class TimeSheetComponent implements OnInit {

  submitted: boolean;
  timeSheet: TimeSheet;

  @ViewChildren('activities') activities: QueryList<ActivityComponent>;
  
  constructor(
    private route: ActivatedRoute,
    private apiService: TimeSheetsService,
  ) { }

  ngOnInit() {
    this.getTimeSheet();
  }
  getTimeSheet(): void {
    // the (+) operator converts string to number
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.apiService.get(id).subscribe(
        timeSheet => { this.timeSheet = timeSheet;
        !this.timeSheet.hasActivities() ? this.timeSheet.addActivity() : null;
    });
  }

  addActivity() {
    this.timeSheet.addActivity();
  }

  deleteActivity(activityId: number) {
    // Removes the activity component from the view
    let index = this.timeSheet.activities
        .findIndex(activity => activity.id == activityId)
    this.timeSheet.activities.splice(index, 1);
    if (!activityId) { return } // Can't delete what doesn't exist
    this.apiService.deleteActivity(activityId);
  }

  save() {
    this.apiService.update(this.timeSheet)
        .subscribe(timesheet => this.timeSheet = timesheet);
  }

  submit() {
    // Are you sure you want to submit? No more changes can be made
    this.submitted = true;
    this.timeSheet.submitted = new Date();
    this.save();
  }
}