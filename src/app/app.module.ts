import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

/* App Root */
import { AppComponent } from './app.component';

/* Feature Modules */
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TimeSheetsModule } from './time-sheets/time-sheets.module';
import { EmployeesModule } from './employees/employees.module';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    TimeSheetsModule,
    EmployeesModule,
    AppRoutingModule,
  ],
  providers: [],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
