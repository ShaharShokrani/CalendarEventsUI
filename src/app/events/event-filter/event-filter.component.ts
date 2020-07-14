import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../events.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.css']
})
export class EventFilterComponent implements OnInit {  
    constructor(private route: ActivatedRoute,
                private router: Router,
                private eventService: EventService) { }     
  
    ngOnInit() {
    }

    onNewEventClick() {
        this.router.navigate(['new'], {relativeTo: this.route})
    }
}