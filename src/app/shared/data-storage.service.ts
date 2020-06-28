import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { EventModel } from '../events/event.model';
import { EventService } from '../events/event.service';

@Injectable()
export class DataStorageService {
  constructor(
    private http: HttpClient, 
    private eventService: EventService    
  ) {}

  storeEvents() {
    const events = this.eventService.getEvents();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    this.http
      .post(
        'http://localhost:5000/api/events/',
        events,
        httpOptions
      )
      .subscribe(response => {        
      });
  }

  fetchEvents() {
    return this.http.get<EventModel[]>(
      'http://localhost:5000/api/events/'
    )
    .pipe(    
      map(events => {
        return events.map(event => {
          return {
            ...event,
            details: event.details ? event.details : []
          };
        });
      }),
      tap(events => {
        this.eventService.setEvents(events);
      })
    );
  }
}
