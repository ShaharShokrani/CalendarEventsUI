import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EventModelDTO } from './event.model';
import { EventService } from './events.service';

@Injectable()
export class EventResolverService implements Resolve<EventModelDTO> {
  constructor(
    private _eventService: EventService    
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EventModelDTO> {
    let id = route.params['id'];

    return this._eventService.getEventById(id);
  }
}