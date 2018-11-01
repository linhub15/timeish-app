import { ValidatorFn, FormControl, ValidationErrors } from "@angular/forms";


export class CustomValidators {
  /** control.value must equal 'Employee' 
   * Set to invalid if typeof control.value == string
   * If the employee exists, control.value is of type 'Employee'
   */
  static isString: ValidatorFn = (control: FormControl): ValidationErrors | null => {
    return typeof control.value === 'string' ? {'isString': true} : null;
  }

  static noWhiteSpace: ValidatorFn = (control: FormControl): ValidationErrors | null => {
    return control.value != control.value.toString().trim() ? {'hasWhiteSpace': true } : null;
  }
}

