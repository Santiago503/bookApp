import { TestBed } from '@angular/core/testing';

import { BooksService } from './books.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Volumes } from '../models/volumes';
import { HttpHeaders, HttpParams } from '@angular/common/http';


describe('BooksService', () => {
  let service: BooksService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ 
        BooksService, 
        HttpClient,  ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new BooksService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should has fuction for get all Books', () => {
    expect(service.getAllBooks).toBeTruthy();
  });  

  it('should return list of Volumes', (done: DoneFn) => {

    const expectedVolumes: Volumes = {
      kind: 'books#volumes',
      totalItems: 1,
      items: [
        {
          kind: 'books#volume',
          id: '1',
          etag: '1',
          selfLink: '1',
          volumeInfo: {
            title: '1',
            authors: ['1'],
            publisher: '1',
            publishedDate: '1',
            description: '1',
            industryIdentifiers: [
              {
                type: '1',
                identifier: '1'
              } 
            ],
            readingModes: {
              text: true,
              image: true
            },
            pageCount: 1,
            printType: '1',
            categories: ['1'],
            maturityRating: '1',
            allowAnonLogging: true,
            contentVersion: '1',
            panelizationSummary: {
              containsEpubBubbles: true,
              containsImageBubbles: true
            },
            imageLinks: {
              smallThumbnail: '1',
              thumbnail: '1'
            },
            language: '1',
            previewLink: '1',
            infoLink: '1',
              canonicalVolumeLink: '1'
          },  
          saleInfo: {
            country: '1',
            saleability: '1',
            isEbook: true,
          },
          accessInfo: {
            country: '1',
            viewability: '1',
            embeddable: true,
            publicDomain: true,
            textToSpeechPermission: '1',
            epub: {
              isAvailable: true,
              acsTokenLink: '1'
            },
            pdf: {
              isAvailable: true,
              acsTokenLink: '1'
            },
            webReaderLink: '1',
            accessViewStatus: '1',
            quoteSharingAllowed: true
          },
          searchInfo: {
            textSnippet: '1'
          }
        }
      ]
    };

    httpClientSpy.get.and.returnValue(of(expectedVolumes));

    
    const options = {
      headers: new HttpHeaders(),
      params: new HttpParams(),
    };

    options.params = options.params
      .append('q', 'test')
      .append('startIndex', 1);

    service.getAllBooks(options).subscribe(
      volumes => {
        expect(volumes).toEqual(expectedVolumes, 'expected volumes')
        done();
      });
  }); 
  
  it('should has fuction for get byId Books', () => {
    expect(service.getBookById).toBeTruthy();
  });

});
