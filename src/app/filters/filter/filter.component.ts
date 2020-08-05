import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FiltersService } from '../filters.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() filter: any;
  constructor(private _filtersService: FiltersService) { }
  public showContent: boolean = false;
  public filterForm: FormGroup

  ngOnInit() {
    let formControlers: any = []
    this.filter.options && this.filter.options.forEach(option => {
      formControlers[option] = new FormControl()
    })
    this.filterForm = new FormGroup(formControlers);
  }

  toggle($event) {
    this.showContent = !this.showContent;
  }

  onChange() {
    let selectedValues = this.filterForm.value
      ? Object.keys(this.filterForm.value).filter(x => this.filterForm.value[x])
      : []
    this._filtersService.updateSelectedFilters({ [this.filter.name]: selectedValues })
  }
}
