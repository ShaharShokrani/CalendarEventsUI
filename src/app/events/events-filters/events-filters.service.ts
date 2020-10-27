import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';

import { FilterBase, MultiCheckboxFilter, SearchRequest } from 'src/app/shared/models/search-request.model';
import { EventService } from '../events.service';

@Injectable()
export class EventsFiltersService {
  constructor(private _formBuilder : FormBuilder,
    private _eventsService : EventService) { }

  toFormGroup(filters: FilterBase<string>[] ) {
    const group: any = {};
    //TODO: Seperate each filter to a different component.
    filters.forEach(filter => {
      console.log(filter);
      if (filter.options) {
        group[filter.key] = this._formBuilder.array(filter.options.map(_ => false));
      }        
      else {
        group[filter.key] = new FormControl(filter.value || '');
      }        
    });
    return new FormGroup(group);
  }
  search(filters: any) {
    const searchRequest: SearchRequest = {
      filters: filters,
      includeProperties: null,
      orderBy: null
    };
    
    this._eventsService.searchEvents(searchRequest).subscribe();
  }
  getFilters() {
    const filters: FilterBase<string>[] = [

      new MultiCheckboxFilter({
        key: 'audience',
        label: 'Audience',
        options: [
          {key: '1',  value: 'Adult'},
          {key: '2',  value: 'Senior'},
          {key: '3',   value: 'Youth'},
          {key: '4', value: 'Children'},
          {key: '5', value: 'Infants'}
        ],
        order: 3
      }),

      // new TextboxFilter({
      //   key: 'title',
      //   label: 'Title',
      //   value: '',        
      //   order: 1
      // })
    ];

    return of(filters.sort((a, b) => a.order - b.order));
  }

}