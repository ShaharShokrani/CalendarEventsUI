import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../events.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-add-button',
  templateUrl: './event-add-button.component.html',
  styleUrls: ['./event-add-button.component.css']
})
export class EventAddButtonComponent implements OnInit {
  faPlus = faPlus
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService) { }

  ngOnInit() {
  }

  onNewEventClick() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
}