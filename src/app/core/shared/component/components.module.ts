import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoandingComponent } from './loanding/loanding.component';
import { MaterialModule } from '@core/material/material.module';

const components = [ LoandingComponent ];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ...components
  ]
})
export class ComponentsModule { }
