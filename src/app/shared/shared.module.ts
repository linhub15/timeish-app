import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialComponentsModule } from './material-components.module';
import { DatePickerComponent } from './date-picker/date-picker.component';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialComponentsModule,
  ],
  declarations: [DatePickerComponent],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialComponentsModule,
    DatePickerComponent
  ]
})
export class SharedModule { }
