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
      console.log("Hey");

      const valueToStore = Object.assign({}, control, {
        audience: this.convertToValue('audience'),
      });      

      var valueJson = JSON.stringify(valueToStore["audience"]);
      const filters = [{
        "PropertyName": "Audience",
        "FilterType": 1,
        "ValueJson": valueJson
      }]
      
      console.log(valueJson);

      this._eventsFiltersService.search(filters);
    });
  }

  convertToValue(key: string) {        
    var filter = this.filters.find(x=>x.key==key);
    if (filter && filter.options) {
      return this.form.value[key].map((x, i) => x && +filter.options[i].key).filter(x => !!x);
    }    
  }
}