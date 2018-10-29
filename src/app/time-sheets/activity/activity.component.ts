import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

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
  styleUrls: ['./activity.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class ActivityComponent implements OnInit, OnChanges {
  @Input() activityForm: FormGroup;
  @Input() hourlyPay: number;
  @Input() isSubmitted: boolean;
  @Output() deleteActivity = new EventEmitter<number>();
  @Output() addActivity = new EventEmitter<true>();

  constructor() { }

  ngOnInit() {
    if (this.isSubmitted) {this.activityForm.disable()}
  }

  ngOnChanges() {
    if (this.isSubmitted) {this.activityForm.disable()}
    this.activityForm.controls['date'].updateValueAndValidity();
  }
  
  showPay(): string {
    const hours = this.activityForm.controls['hours'];
    if (hours.value) {
      const hourString = hours.value > 1 ? 'Hours' : 'Hour';
      const pay = this.hourlyPay * hours.value;
      return hourString + ' ($' + pay + ')';
    }
  }

  delete(): void {
    this.deleteActivity.emit(this.activityForm.value);
  }

  add(): void {
    this.addActivity.emit(true);
  }

}
