import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import { EventModelDTO } from '../event.model';
import { EventService } from '../events.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  eventModel: EventModelDTO;
  id: string;
  faEdit = faEdit
  faTrash = faTrash

  constructor(private eventService: EventService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: Data) => {  
      this.eventModel = data["eventResolverService"];
    });
  }

  onSelect(mode: string) {
  }
  onEditEvent() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute})
  }
  onDeleteEvent() {
    this.eventService.deleteEvent(this.id);
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }
}
