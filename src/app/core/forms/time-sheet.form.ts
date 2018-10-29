import { FormGroup, FormArray, FormControl } from "@angular/forms";
import { ActivityForm } from "./activity.form";
import { Activity, TimeSheet } from "../models";
import { TimeSheetsService } from "../services";

export class TimeSheetForm extends FormGroup {

    public saved: boolean;
    public timeSheet: TimeSheet;
    private _activities;

    constructor(timeSheet?: TimeSheet) {
        
        super({activities: new FormArray([])});

        if (!timeSheet) { return }

        this.timeSheet = timeSheet;
        this.saved = true;
        this._activities = <FormArray>this.controls['activities'];
        this._initForm();
        
    }

    addActivity() {
        this._activities.push(new ActivityForm());
        this._edited();
    }

    /**
     * 
     * @param formToDeleteValue comes from event emitter $event
     */
    deleteActivity(activityToDelete: number) {
        if (this._activities.length > 1) {
            const activityIndex = this._activities.controls.findIndex(
                activity => activity.value == activityToDelete);
            this._activities.removeAt(activityIndex);
        }
        this._edited();
    }

    saveChanges(apiService: TimeSheetsService) {
        this.markFormTouched(this);
        if(this.invalid) { return }

        const forms = <ActivityForm[]>this._activities.controls;
        const changes = ActivityForm.toActivity(forms, this.timeSheet.employee.hourlyPay);

        this._deleteDifferences(changes, apiService);
        apiService.update(this.timeSheet).subscribe();
        this._saved();
    }

    submitTimeSheet(apiService: TimeSheetsService) {
        this.markFormTouched(this);
        if(this.invalid) { return }
        this.timeSheet.submitted = new Date();
        apiService.update(this.timeSheet).subscribe();
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

    private _initForm() {
        if (this.timeSheet.activities.length > 0) {
            this.timeSheet.activities.forEach(activity => {
                this._activities.push(new ActivityForm(activity));})
        }
        else { this._activities.push(new ActivityForm()) }
    }

    private _edited() {
        this.markAsDirty();
        this.saved = false;
    }

    private _saved() {
        this.markAsPristine();
        this.saved = true;
    }

    private _deleteDifferences(changes: Activity[],apiService: TimeSheetsService) {
        const differences = this.timeSheet.activities.filter(original => 
          changes.findIndex(change => original.id == change.id) < 0);
        differences.forEach(removed => apiService.deleteActivity(removed.id));
        this.timeSheet.activities = changes; // This must happen last
    }
} 
