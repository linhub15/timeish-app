import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Activity } from "../models";
import { TimeSheetForm } from ".";

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
  private _toActivity(): Activity {
    return new Activity().deserialize({
      id: this._id,
      date: this.controls['date'].value,
      description: this.controls['description'].value,
      hours: this.controls['hours'].value,
      pay: this._getPay(this.controls['hours'].value)
    })
  }
  private _getPay(hours: number): number {
    const hourlyPay = (<TimeSheetForm>this.parent.parent).timeSheet.employee.hourlyPay
    return hourlyPay * hours;
  }

  static toActivity(forms: ActivityForm[]): Activity[] {
    let activities: Activity[] = [];
    forms.forEach(form => activities.push(form._toActivity()))
    return activities;
  }

}