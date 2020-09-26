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

  getEvents(filter: string) : Observable<EventModelDTO[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._httpClient
      .post<EventModelDTO[]>(
        this._configService.resourceApiURI + '/events/search',
        {},
        httpOptions
      );
  }

  getEventById(id: string) : Observable<EventModelDTO> {
    const options = {        
      params: new HttpParams().set('id', id)
    };

    return this._httpClient
      .get<EventModelDTO>(
        this._configService.resourceApiURI + '/events/getbyid',
        options
      );
  }
}