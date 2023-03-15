import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSearchComponent } from './book-search.component';
import { HttpClientModule } from '@angular/common/http';
import { BooksService } from '@app/core/services/books.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BooksRoutingModule } from '../books-routing.module';
import { MaterialModule } from '@core/material/material.module';
import { ComponentsModule } from '@core/shared/component/components.module';
import { RouterTestingModule } from '@angular/router/testing';
import { of, BehaviorSubject } from 'rxjs';
import { tick, fakeAsync } from '@angular/core/testing';
import { HttpHeaders, HttpParams } from '@angular/common/http';

describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let booksService: jasmine.SpyObj<BooksService>;

  beforeEach(async () => {
    booksService = jasmine.createSpyObj('BooksService', ['getAllBooks']);
    await TestBed.configureTestingModule({
      declarations: [ BookSearchComponent ],
      imports: [ 
        HttpClientTestingModule, 
        CommonModule,
        FormsModule,
        BooksRoutingModule,
        RouterTestingModule,
        MaterialModule,
        ComponentsModule ],
      providers: [ 
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: BooksService, useValue: booksService }
       ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title Search Books', () => {
    const fixture = TestBed.createComponent(BookSearchComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Search Books');
  });

  it('should has input for search query', () => {
    const fixture = TestBed.createComponent(BookSearchComponent);
    const app = fixture.componentInstance
    fixture.detectChanges()

    const input = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();
    expect(input).toBeTruthy();
  });

  it('should active loading when getAllBooks is called', fakeAsync(() => {
    const loading = true;

    const options = {
      headers: new HttpHeaders(),
      params: new HttpParams(),
    };

    options.params = options.params
      .append('q', 'test')
      .append('startIndex', 1);

    booksService.getAllBooks.withArgs(options);

    component.getBooksBySearch('test', 1);
    tick();

    expect(component.loading$.getValue()).toBe(loading);
  }));

});
