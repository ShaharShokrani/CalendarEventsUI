import { Component, OnInit } from '@angular/core';

@Component({  
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers: []
})
export class EventsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("EventsComponent");
  }
}
