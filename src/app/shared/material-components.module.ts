import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatButtonModule, MatCardModule, 
        MatFormFieldModule, MatInputModule, 
        MatDatepickerModule, MatExpansionModule,
        MatNativeDateModule, MatDialogModule,
        MatAutocompleteModule, MatIconModule,
        MatToolbarModule, MatSidenavModule, 
        MatListModule, MatTooltipModule,
        MatChipsModule, MatTableModule,
        MatMenuModule, MatRippleModule
      } from '@angular/material';
//import {MatRippleModule} from '@angular/material/core'

  const materialComponentModules = [
    BrowserAnimationsModule,
    MatButtonModule, MatCardModule, 
    MatFormFieldModule, MatInputModule, 
    MatDatepickerModule, MatExpansionModule,
    MatNativeDateModule, MatDialogModule,
    MatAutocompleteModule, MatIconModule,
    MatToolbarModule, MatSidenavModule, 
    MatListModule, MatTooltipModule,
    MatChipsModule, MatTableModule,
    MatMenuModule, MatRippleModule,
  ];

@NgModule({
  imports: materialComponentModules,
  exports: materialComponentModules,
})
export class MaterialComponentsModule { }
