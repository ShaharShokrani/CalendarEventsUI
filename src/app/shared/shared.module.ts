import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
//import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { ConfigService } from './config.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    //PlaceholderDirective,
    DropdownDirective
  ],
  imports: [
    CommonModule, 
    NgxSpinnerModule
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    //PlaceholderDirective,
    NgxSpinnerModule,
    DropdownDirective,
    CommonModule
  ],
  providers: [ConfigService]
  //entryComponents: [AlertComponent]
})
export class SharedModule {}
