import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { throwIfAlreadyLoaded } from './module-import-guard';

/* Components */
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ApiService, EmployeeService, TimeSheetsService } from './services';


@NgModule({
  imports: [ CommonModule, SharedModule],
  providers: [
    ApiService, 
    EmployeeService, 
    TimeSheetsService
  ],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent]
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
