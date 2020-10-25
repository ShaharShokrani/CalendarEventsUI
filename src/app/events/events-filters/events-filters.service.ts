import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';

import { FilterBase, MultiCheckboxFilter } from 'src/app/shared/models/search-request.model';

@Injectable()
export class EventsFiltersService {
  constructor(private _formBuilder : FormBuilder) { }

  toFormGroup(filters: FilterBase<string>[] ) {
    const group: any = {};

    filters.forEach(filter => {
      console.log(filter);
      if (filter.options) {
        group[filter.key] = this._formBuilder.array(filter.options.map(_ => true));
      }        
      else {
        group[filter.key] = new FormControl(filter.value || '');
      }        
    });
    return new FormGroup(group);
  }

  getFilters() {
    const filters: FilterBase<string>[] = [

      new MultiCheckboxFilter({
        key: 'audience',
        label: 'Audience',
        options: [
          {key: 'adult',  value: 'Adult'},
          {key: 'senior',  value: 'Senior'},
          {key: 'youth',   value: 'Youth'},
          {key: 'children', value: 'Children'},
          {key: 'infant', value: 'Infants'}
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