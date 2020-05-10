import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { EventModel } from '../event.model';
import { EventService } from '../events.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  eventModel: EventModel;
  id: string;

  constructor(private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.eventModel = this.eventService.getEventModel(this.id);
        }
      )
    console.log("EventDetailsComponent.ngOnInit");
  }

  onSelect(mode: string) {
  }
  onEditEvent() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }
  onDeleteEvent() {
    this.eventService.deleteEvent(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
