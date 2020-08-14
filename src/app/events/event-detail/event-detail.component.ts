import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  faEdit = faEdit;
  faDelete= faTrash;

  constructor(private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.eventModel = this.activatedRoute.snapshot.data["eventResolverService"];
        }
      )

    this.eventModel = this.activatedRoute.snapshot.data["eventResolverService"];

    if (!this.eventModel.description) {
      this.eventModel.description = "this is hard coded because the description is not saved in the DB"
    }

    if (!this.eventModel.imagePath) {
      this.eventModel.imagePath = `https://via.placeholder.com/400x200/028090/FFFFFF/?text=${this.eventModel.title}`
    }

    // .subscribe(
    //   event => {
    //     if (event) {
    //       return event;
    //     } else {
    //       this._router.navigate(['/events']);
    //       return;
    //     }
    //   },      
    //   error => {
    //     console.log(error)
    //   }
    // )

    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.id = params['id'];
    //       this.eventService.getEventModel(this.id).then(
    //         result => this.eventModel = result,
    //         error => console.log(error)
    //       );
    //     }
    //   )
  }

  onSelect(mode: string) {
  }
  onEditEvent() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute })
  }
  onDeleteEvent() {
    this.eventService.deleteEvent(this.id);
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
