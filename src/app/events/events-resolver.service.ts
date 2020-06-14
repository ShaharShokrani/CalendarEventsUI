import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { EventModel } from './event.model';
import { DataStorageService } from '../shared/data-storage.service';
import { EventService } from './event.service';

@Injectable({ providedIn: 'root' })
export class EventsResolverService implements Resolve<EventModel[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private eventsService: EventService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const events = this.eventsService.getEvents();

    if (events.length === 0) {
      return this.dataStorageService.fetchEvents();
    } else {
      return events;
    }
  }
}
