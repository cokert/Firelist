import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth.service';
import { AuthComponent } from './auth.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthService
  ],
  declarations: [
    AuthComponent
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
