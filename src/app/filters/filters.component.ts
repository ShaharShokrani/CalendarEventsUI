import { Component, OnInit } from '@angular/core';
import { FiltersService } from './filters.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  constructor(private _filtersService: FiltersService) { }
  public showRuleContent: boolean = false;

  ngOnInit() {
  }

  toggle($event) {
    this.showRuleContent = !this.showRuleContent;
  }
}
