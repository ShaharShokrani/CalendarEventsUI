import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FilterStatement,FilterOperation, PropertiesNames_Mapping as PROPERTIES_NAMES_MAPPING, Operation_Mapping, FilterBase } from 'src/app/shared/models/search-request.model';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.css']
})
export class EventFilterComponent implements OnInit {
  faPlus = faPlus;
  faCheck = faCheck;

  propertiesNames: any = PROPERTIES_NAMES_MAPPING;
  operations: any = Operation_Mapping;
  
  filterFormGroup: FormGroup;
  filterFormGroupsArray: Array<FormGroup>;
  private _controlConfig: { [key: string]: any; };
  private _defaultFilterStatement: FilterStatement;

  _filterStatements: FilterStatement[] = [    
    {propertyName: "Start", operation: 9 , value: "2020-09-01T20:22:03.617" },
    // {quantity: 12, name: 'Narco' , price: 11 },
    // {quantity: 13, name: 'Bombasto' , price: 12 }
  ];

  constructor(private fb: FormBuilder) { 
    this.filterFormGroupsArray = [];

    this.filterFormGroup = this.fb.group({
      filtersArray: this.fb.array(this.filterFormGroupsArray)
    });    
    
    this._defaultFilterStatement = {
      propertyName: 'IsAllDay',
      operation: FilterOperation.Equal,
      value: 'True'
    };

    if (this._filterStatements.length != 0) {
      this._filterStatements.forEach((filterStatement : FilterStatement) => {
        this.filtersArray.push(this.createCustomerFormGroup(filterStatement));
      });
    }
    else {
      this.filtersArray.push(this.createCustomerFormGroup(this._defaultFilterStatement));
    }

    // for (let formGroup of this.filterFormGroupsArray) {
    //   formGroup.get("firstName").valueChanges.subscribe(control => {
    //     console.log(formGroup);        
    //   });
    // }
  }

  toFormGroup(filters: FilterBase<string>[] ) {
    const group: any = {};

    filters.forEach(filter => {
      group[filter.key] = filter.required ? new FormControl(filter.value || '', Validators.required)
                                              : new FormControl(filter.value || '');
    });
    return new FormGroup(group);
  }

  get filtersArray(): FormArray {
    return this.filterFormGroup.get('filtersArray') as FormArray;
  }

  ngOnInit(): void {
  }
  
  createCustomerFormGroup(filterStatement: FilterStatement) {
    this._controlConfig = {
      propertyName: [filterStatement.propertyName, Validators.required],
      operation: [filterStatement.operation, Validators.required],
      value: [filterStatement.value, Validators.required]
    }
    return this.fb.group(this._controlConfig);
  }

  onAddFilterClick() {
    this.filtersArray.push(this.createCustomerFormGroup(this._defaultFilterStatement));    
  }
  onSubmit() {    
    var filters : FilterStatement[] = [];        

    this.filtersArray.controls.forEach(control => {
      var filterStatement = new FilterStatement();
      filterStatement.propertyName = control.value["propertyName"];
      filterStatement.operation = +control.value["operation"]
      filterStatement.value = control.value["value"];
      filters.push(control.value);
    });    
  }
}