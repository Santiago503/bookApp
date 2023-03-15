import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { BooksService } from '@app/core/services/books.service';
import { Volumes } from '@app/core/models/volumes';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
} from 'rxjs/operators';
import {
  Subject,
  fromEvent,
  Observable,
  BehaviorSubject,
  finalize,
  tap,
} from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css'],
})
export class BookSearchComponent implements OnInit {
  books$: Observable<Volumes>;

  loading$ = new BehaviorSubject<boolean>(false);

  inputTextSearch$: any;
  maxResults: number = 12;

  @ViewChild('searchQuery', { static: true }) searchQuery!: ElementRef;

  constructor(private booksService: BooksService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBooksBySearch();
    this.inputTextSearch$ = fromEvent(this.searchQuery.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        filter((x) => x.length > 2),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.getBooksBySearch(text);
      });
  }

  getBooksBySearch(searchQuery: string = 'programacion reactiva', page = 0) {
    try {
      this.loading$.next(true);

      const options = {
        headers: new HttpHeaders(),
        params: new HttpParams(),
      };

      options.params = options.params
        .append('q', searchQuery)
        .append('startIndex', page)
        .append('maxResults', this.maxResults.toString());

      this.books$ = this.booksService.getAllBooks(options).pipe(
        tap((value) => {
          this.loading$.next(false);
        }),
        finalize(() => {
          this.loading$.next(false);
        })
      );
    } catch (error) {}
  }


  getDetails(id: string) {
    const dialogRef = this.onCreateDialog(BookDetailsComponent, '100', '50', id);
  }

  //Crear Dialog Material
  onCreateDialog(
    components: any,
    height?: string,
    width?: string,
    data?: any,
    position: string = '',
    disableClose: boolean = false,
    autoFocus: boolean = true
  ) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = disableClose;
    dialogConfig.autoFocus = autoFocus;

    dialogConfig.minHeight = '350Px';
    dialogConfig.minWidth = '350px';

    if (position == 'right') {
      dialogConfig.height != '100'
        ? (dialogConfig.position = { right: '0px' })
        : (dialogConfig.position = { right: '0px', top: '0px' });
    } else if (position == 'left') {
      dialogConfig.height != '100'
        ? (dialogConfig.position = { left: '0px' })
        : (dialogConfig.position = { left: '0px', top: '0px' });
    }

    if (width) dialogConfig.width = width + '%';

    if (height) dialogConfig.height = height + '%';

    dialogConfig.data = {
      data,
    };

    const dg = this.dialog.open(components, dialogConfig);
    return dg;
  }
}
