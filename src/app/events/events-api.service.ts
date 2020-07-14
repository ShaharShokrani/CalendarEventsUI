import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, tap, take, exhaustMap, share, shareReplay, catchError } from 'rxjs/operators';

import { EventModelDTO } from './event.model';
import { ConfigService } from '../shared/config.service';
import { Observable, EMPTY } from 'rxjs';

@Injectable()
export class EventsAPIService {
  fetchEvents$: Observable<EventModelDTO[]>[] = [];

  constructor (
    private _httpClient: HttpClient,     
    private _configService: ConfigService
  ) {}

  postEvents(events: EventModelDTO[]) : Observable<EventModelDTO[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    return this._httpClient
      .post<EventModelDTO[]>(
         this._configService.resourceApiURI + 'events/',
        events,
        httpOptions
      );
  }

  getEvents(filter: string) : Observable<EventModelDTO[]> {
    return this._httpClient
      .get<EventModelDTO[]>(
        this._configService.resourceApiURI + 'events/'
      );

    // console.log(this.fetchEvents$);
    // if (this.fetchEvents$[filter]) {
    //   console.log("return this.fetchEvents$[filter];");
    //   return this.fetchEvents$[filter];
    // }

    // this.fetchEvents$[filter] = this._httpClient
    //   .get<EventModelDTO[]>(
    //     this._configService.resourceApiURI + 'events/'      
    //   )
    //   .pipe(
    //     shareReplay({ bufferSize: 1, refCount: true }),
    //     catchError(err => {
    //       delete this.fetchEvents$[filter];
    //       return EMPTY;
    //     })
    //   );
    
    // return this.fetchEvents$[filter];
  }

  getEventById(id: string) : Observable<EventModelDTO> {
    return this._httpClient
      .get<EventModelDTO>(
        this._configService.resourceApiURI + 'events/' + id
      );
  }
}