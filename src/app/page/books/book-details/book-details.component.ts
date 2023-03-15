import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from '@app/core/services/alert.service';
import { BooksService } from '@app/core/services/books.service';
import { Volume } from '@app/core/models/volumes';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book$: Observable<Volume>;
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) private matDialogData: any,
    private alert: AlertService,
    private booksService: BooksService
  ) {
  }

  ngOnInit(): void {
    this.getBooksById(this.matDialogData.data);
  }

  getBooksById(id: string) {
    try {
      this.loading$.next(true);

      const options = {
        headers: new HttpHeaders(),
        params: new HttpParams(),
      };

      options.params = options.params.append('projection', 'lite');

      this.book$ = this.booksService.getBookById(id, options).pipe(
        tap((value) => {
          console.log('details:', value);
          this.loading$.next(false);
        }),
        finalize(() => {
          this.loading$.next(false);
        })
      );
    } catch (error) {}
  }
}
