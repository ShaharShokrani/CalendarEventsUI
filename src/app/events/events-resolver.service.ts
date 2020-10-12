import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EventModelDTO } from './event.model';
import { EventService } from './events.service';
import { SearchRequest } from '../shared/models/search-request.model';

@Injectable()
export class EventsResolverService implements Resolve<EventModelDTO[]> {
  constructor(    
    private _eventsService: EventService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<EventModelDTO[]> {
    console.log(route);
    var searchRequest = new SearchRequest();
    return this._eventsService.searchEvents(searchRequest);
  }
}