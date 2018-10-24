import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* App Root */
import { AppComponent } from './app.component';

/* Feature Modules */
import { CoreModule } from './core';
import { SharedModule } from './shared/shared.module';
import { TimeSheetsModule } from './time-sheets/time-sheets.module';
import { EmployeesModule } from './employees/employees.module';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    TimeSheetsModule,
    EmployeesModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
