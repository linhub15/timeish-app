import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
/* Components */
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [ CommonModule, SharedModule ],
  entryComponents: [],
  declarations: [
    LoginComponent
  ],
  exports: [LoginComponent]
})
export class AuthenticationModule { }
