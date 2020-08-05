import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EventModelDTO } from './event.model';
import { EventService } from './events.service';

@Injectable()
export class EventsResolverService implements Resolve<EventModelDTO[]> {
  constructor(
    private _eventsService: EventService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EventModelDTO[]> {
    return this._eventsService.getEvents();
  }
}