import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms'
import { BooksRoutingModule } from './books-routing.module';
import { BookSearchComponent } from './book-search/book-search.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { MaterialModule } from '@core/material/material.module';
import { ComponentsModule } from '@core/shared/component/components.module';


@NgModule({
  declarations: [
    BookSearchComponent,
    BookDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BooksRoutingModule,
    MaterialModule,
    ComponentsModule
  ]
})
export class BooksModule { }
