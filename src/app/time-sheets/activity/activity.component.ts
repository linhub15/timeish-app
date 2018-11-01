import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { ActivityForm } from '../../core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'ddd MMM D, Y',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class ActivityComponent implements OnInit, OnChanges {
  @Input() activityForm: ActivityForm;
  @Input() isSubmitted: boolean;
  @Output() deleteActivity = new EventEmitter<number>();
  @Output() addActivity = new EventEmitter<true>();

  constructor() { }

  ngOnInit() {
    if (this.isSubmitted) {this.activityForm.disable()}
  }

  ngOnChanges() {
    if (this.isSubmitted) {this.activityForm.disable()}
  }
  
  showPay(): string {
    const hours = this.activityForm.controls['hours'];
    if (hours.value) {
      const hourString = hours.value > 1 ? 'Hours' : 'Hour';
      const pay = this.activityForm.getPay(hours.value);
      return hourString + ' ($' + pay + ')';
    }
  }

  getErrorMessage(formControlName: string) : string {
    const control = this.activityForm.controls[formControlName];
    if (control.hasError('required')) { return 'Required' }
    else if (control.hasError('min')) { return 'Must be 0 or greater'}
    else if (control.hasError('max')) { return 'Must be 10 or less'}
    else { return '' }
  }

  delete() {
    this.deleteActivity.emit(this.activityForm.value);
  }

  add() {
    this.addActivity.emit(true);
  }

}
