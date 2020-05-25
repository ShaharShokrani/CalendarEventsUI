import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { EventModel } from '../events/event.model';
import { EventService } from '../events/event.service';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient, 
    private eventService: EventService,
    private authService: AuthService
  ) {}

  storeEvents() {
    const events = this.eventService.getEvents();
    this.http
      .put(
        'https://calendareventsui.firebaseio.com/events.json',
        events
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchEvents() {
    return this.http.get<EventModel[]>(
      'https://calendareventsui.firebaseio.com/events.json'
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
