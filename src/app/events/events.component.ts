import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterBase } from '../shared/models/search-request.model';
import { EventsFiltersService } from './events-filters/events-filters.service';

@Component({  
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers: []
})
export class EventsComponent implements OnInit {  

  filters$: Observable<FilterBase<any>[]>;
  constructor(_eventsFiltersService: EventsFiltersService) { 
    this.filters$ = _eventsFiltersService.getFilters();
  }

  ngOnInit() {
    console.log("EventsComponent");
  }
}
