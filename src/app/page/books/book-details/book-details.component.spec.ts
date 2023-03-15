import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';
import { BooksService } from '@app/core/services/books.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@core/material/material.module';
import { ComponentsModule } from '@core/shared/component/components.module';
import { BooksRoutingModule } from '../books-routing.module';
import { AlertService } from '../../../core/services/alert.service';
import { RouterTestingModule } from '@angular/router/testing';
describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDetailsComponent ],
      imports: [ 
        HttpClientTestingModule, 
        RouterTestingModule,
        CommonModule,
        FormsModule,
        BooksRoutingModule,
        MaterialModule,
        ComponentsModule ],
      providers: [ 
        BooksService, 
        AlertService,
        { provide: MAT_DIALOG_DATA, useValue: {} },]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
