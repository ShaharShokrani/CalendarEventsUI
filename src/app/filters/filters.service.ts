import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  public filters: any = []
  private selectedFilters = {}
  private allEvents: any = []
  public filteredEvents: any = []

  constructor() { }

  ngOnInit() {
    this.filters = []
    this.selectedFilters = {}
  }

  initFilters(filters) {
    this.filters = filters
  }

  initData(events) {
    this.allEvents = events
    this.filteredEvents = events
    this.selectedFilters = {}
    this.filters = [
      { name: "age", options: ["children", "youth", "adults", "all"], type: 'checkbox' },
      { name: "category", options: ["shows", "sport"], type: 'checkbox' }
    ]
  }

  updateSelectedFilters(filter) {
    this.selectedFilters = { ...this.selectedFilters, ...filter }
    this.filterEvents()
    console.log("updated selectedFilters", this.selectedFilters)
  }

  filterEvents() {
    let filteredEvents = this.allEvents
    this.selectedFilters && Object.keys(this.selectedFilters)
      .forEach(filterName => {
        if (this.selectedFilters[filterName].length > 0) {
          filteredEvents = filteredEvents
            .filter(event => this.selectedFilters[filterName]
              .indexOf(event[filterName]) != -1)
        }
      })
  }

  resetSelectedFilters(filter) {
    this.selectedFilters = {}
    console.log("reset selectedFilters", this.selectedFilters)
  }

}
