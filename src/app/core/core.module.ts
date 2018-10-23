import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

/* Components */
import { ToolbarComponent } from './toolbar/toolbar.component';


@NgModule({
  imports: [ CommonModule, SharedModule ],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
