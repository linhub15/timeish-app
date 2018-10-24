import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Activity } from '../../core/models/activity.model';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent {
  @Input() activity: Activity;
  @Input() hourlyPay: number;
  @Input() isSubmitted: boolean;
  @Output() deleteActivity = new EventEmitter<number>();
  @Output() addActivity = new EventEmitter<true>();

  constructor() { }

  ngOnInit() { }

  calculatePay(): void {
    this.activity.pay = this.hourlyPay * this.activity.hours;
  }

  showPay(): string {
    if (this.activity.hours) {
      this.calculatePay();
      const hourString = this.activity.hours > 1 ? 'Hours' : 'Hour';
      return hourString + ' ($' + this.activity.pay + ')';
    }
  }

  delete(): void {
    this.deleteActivity.emit(this.activity.id);
  }

  add(): void {
    this.addActivity.emit(true);
  }
}
