import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialComponentsModule } from './material-components.module';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialComponentsModule,
  ],
  declarations: [ToolbarComponent],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialComponentsModule,
    ToolbarComponent
  ]
})
export class SharedModule { }
