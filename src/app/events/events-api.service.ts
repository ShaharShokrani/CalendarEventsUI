import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, tap, take, exhaustMap, share, shareReplay, catchError } from 'rxjs/operators';

import { EventModelDTO } from './event.model';
import { ConfigService } from '../shared/config.service';
import { Observable, EMPTY } from 'rxjs';
import { SearchRequest } from '../shared/models/search-request.model';

@Injectable()
export class EventsAPIService {
  fetchEvents$: Observable<EventModelDTO[]>[] = [];

  constructor (
    private _httpClient: HttpClient,     
    private _configService: ConfigService
  ) {}

  insertEvents(events: EventModelDTO[]) : Observable<EventModelDTO[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    return this._httpClient
      .post<EventModelDTO[]>(
         this._configService.resourceApiURI + '/events/insert',
        events,
        httpOptions
      );
  }

  getEvents(searchRequest: SearchRequest) : Observable<EventModelDTO[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._httpClient
      .post<EventModelDTO[]>(
        this._configService.resourceApiURI + '/events/search',
        searchRequest,
        httpOptions
      );
  }

  getEventById(id: string) : Observable<EventModelDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._httpClient
      .post<EventModelDTO>(
        this._configService.resourceApiURI + '/events/getbyid',
        id,
        httpOptions
      );
  }
}