import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpParams} from '@angular/common/http';
import { environment } from '@env/environment';
import { Volumes, Volume } from '@app/core/models/volumes';
import { Observable } from 'rxjs';

export class RequestOptionsModel {
  headers?: HttpHeaders;
  params?: HttpParams;
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  headers?: HttpHeaders = new HttpHeaders();
  constructor(private httpClient: HttpClient) { }

  private httpOptionsHandler(
    options?: RequestOptionsModel,
  ) {
    if (!options) {
      options = { headers: new HttpHeaders() };
      // options.headers
      //   .set("Content-Type", "application/json")
      //   .set("Accept", "application/json");
    }

    return options;
  }

  getAllBooks(options?: RequestOptionsModel): Observable<Volumes> {

    options = this.httpOptionsHandler(options);
    return this.httpClient.get(environment.urlAPi + 'volumes', options) as Observable<Volumes>;
  }

  getBookById(id: string, options?: RequestOptionsModel): Observable<Volume> {
    console.log(id);
    options = this.httpOptionsHandler(options);
    return this.httpClient.get(environment.urlAPi + `volumes/${id}`, options ) as Observable<Volume>;
  }

}
