import { Component, Input, forwardRef } from '@angular/core';
import { MatDatepickerInputEvent, MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';

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
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styles: [`:host { margin: 0 10px 10px 10px;}
    :host:hover { cursor: pointer;}
    input {cursor: pointer;}`],
  providers: [
    { provide: NG_VALUE_ACCESSOR, 
      useExisting: forwardRef(()=> DatePickerComponent),
      multi:true }
    ,{ provide: DateAdapter, useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE] }
    ,{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class DatePickerComponent implements ControlValueAccessor {
  private format = "YYYY-MM-DD";
  @Input() public placeholder: string = "Select Date";
  @Input() _dateValue: string = null;
  @Input() disabled: boolean;
  constructor() { }
  
  get dateValue() {
    return moment(this._dateValue, this.format);
  }

  set dateValue(val) {
    this._dateValue = moment(val).format(this.format);
    this.propagateChange(this._dateValue);
  }
  
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dateValue = moment(event.value, this.format);
  }

  writeValue(value: any) {
      if (value !== undefined) {
        this.dateValue = moment(value, this.format);
      }
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }
}
