import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';

import { TimeSheet, TimeSheetsService, Activity } from '../../core';

export class ActivityForm extends FormGroup {
  private _id: number;
    constructor(activity?: Activity) {
    if (!activity) { activity = new Activity()}
    super({
      date: new FormControl(activity.date, {validators: Validators.required}),
      description: new FormControl(activity.description),
      hours: new FormControl(activity.hours, {validators: Validators.required})
    });
    this._id = activity.id;
    
  }
  toActivity(hourlyPay: number): Activity {
    return new Activity().deserialize({
      id: this._id,
      date: this.controls['date'].value,
      description: this.controls['description'].value,
      hours: this.controls['hours'].value,
      pay: this.getPay(hourlyPay, this.controls['hours'].value)
    })
  }
  getPay(hourlyPay: number, hours: number): number {
    return hourlyPay * hours;
  }
}

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.css']
})
export class TimeSheetComponent implements OnInit {
  timeSheetForm: FormGroup = new FormGroup({
    activities: new FormArray([])
  });
  timeSheet: TimeSheet;

  constructor(
    private route: ActivatedRoute,
    private apiService: TimeSheetsService,
  ) { }

  ngOnInit() {
    const id: number = +this.route.snapshot.paramMap.get('id');
    const timeSheet$ = this.apiService.get(id);
    timeSheet$.subscribe(timeSheet => this.timeSheet = timeSheet);
    timeSheet$.subscribe(timeSheet => this.initActivities(timeSheet));
  }

  initActivities(timeSheet: TimeSheet) {
    const activities = this.getActivities();
    if (timeSheet.activities.length > 0) { 
      timeSheet.activities.forEach(activity => {
        activities.push(new ActivityForm(activity));
      })
    }
    else { activities.push(new ActivityForm()) }
  }

  /** Add Activity Button */
  addActivity() {
    const activities = this.getActivities();
    activities.push(new ActivityForm());
  }

  /** Delete Activity Button */
  deleteActivity(activityFormValue: ActivityForm) {
    const activities = this.getActivities();
    if (activities.length > 1) { // only delete if there is more than 1 activity
      const index = activities.controls.findIndex(arrayForm => arrayForm.value == activityFormValue);
      activities.removeAt(index);
    }
  }

  /** Save Button */
  save() {
    this.markFormTouched(this.timeSheetForm);
    if (this.timeSheetForm.invalid) { return }
    const toDelete = this.refreshTimeSheetValuesFromForm();
    toDelete.forEach(activity => this.apiService.deleteActivity(activity.id));
    this.apiService.update(this.timeSheet).subscribe();
    if (this.timeSheet.activities.length === 0 ) { this.addActivity() }
    this.timeSheetForm.markAsPristine();
  }

  /** Submit Button */
  submitTimeSheet() {
    this.markFormTouched(this.timeSheetForm);
    if (this.timeSheetForm.invalid) { return }
    // Are you sure you want to submit? No more changes can be made
    this.timeSheet.submitted = new Date();
    this.save();
  }

  refreshTimeSheetValuesFromForm(): Activity[] {
    let newActivityState: Activity[] = [];
    const activityForms = <ActivityForm[]>this.getActivities().controls;
    activityForms.forEach(form => newActivityState.push(form.toActivity(this.timeSheet.employee.hourlyPay)));
    let deletedActivities = this.filterDeleted(newActivityState, this.timeSheet.activities);
    this.timeSheet.activities = newActivityState;
    return deletedActivities;
  }

  filterDeleted(changed: Activity[], original: Activity[]) {
    return original.filter(originalActivity => 
      changed.findIndex(changedActivity => 
        originalActivity.id == changedActivity.id) < 0)
  }

  getActivities(): FormArray {
    return <FormArray>this.timeSheetForm.get('activities');
  }

  // Temporary fix for angular/angular#19400
  // Pull request angular/agular/pull/26812
  markFormTouched(form: FormGroup | FormArray) {
    if (!form.controls) { return }
    const keys = Object.keys(form.controls);
    for (let i = 0; i < keys.length; i++) {
      const control = form.controls[keys[i]];

      if (control instanceof FormControl) {
        control.markAsTouched();
      } else { // Assumes it is FormGroup or formArray
        this.markFormTouched(control);
      }
    }
  }
}