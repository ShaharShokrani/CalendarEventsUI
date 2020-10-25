import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FilterBase } from 'src/app/shared/models/search-request.model';

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html'
})
export class EventFilterComponent {
  @Input() filter: FilterBase<string>;
  @Input() form: FormGroup;

  get options(): FormArray {
    var result = this.form.get(this.filter.key) as FormArray;
    return result;
  }
}