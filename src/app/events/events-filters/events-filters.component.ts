import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterBase } from 'src/app/shared/models/search-request.model';
import { EventsFiltersService } from './events-filters.service';

@Component({
  selector: 'app-events-filters',
  templateUrl: './events-filters.component.html',
  providers: [ EventsFiltersService ]
})
export class EventsFiltersComponent implements OnInit {

  @Input() filters: FilterBase<string>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private _eventsFiltersService: EventsFiltersService) { }

  ngOnInit() {
    this.form = this._eventsFiltersService.toFormGroup(this.filters);    
    this.form.valueChanges.subscribe(control => {
            
      const valueToStore = Object.assign({}, control, {
        audience: this.convertToValue('audience'),
      });      

      var payLoad = JSON.stringify(valueToStore);
      console.log(payLoad);
    });
  }

  convertToValue(key: string) {        
    var filter = this.filters.find(x=>x.key==key);
    if (filter && filter.options) {
      return this.form.value[key].map((x, i) => x && filter.options[i]).filter(x => !!x);
    }    
  }
}