import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../events.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventModelDTO } from '../event.model';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  id: string;
  editMode = false;
  eventForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      )
  }
  onSubmit() {
    if (this.editMode) {
      this.eventService.updateEvent(this.id, this.eventForm.value);
    }
    else {
      this.eventService.addEvent(this.eventForm.value);
    }
    this.onCancel();
  }
  onCancel() {
    //Go up one level, if we were editing this will take us details
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onChange() {
    console.log(this.eventForm)
  }

  initForm() {
    let eventTitle = '';
    let eventImagePath = '';
    let eventDescription = '';
    let eventStart = new Date();
    let eventEnd = new Date();
    let eventIsAllDay = false;
    let eventUrl = '';

    if (this.editMode) {
      const eventModel = new EventModelDTO("x", "x", null, "s", null, null, "a", true, "s", null); //this.eventService.getEventModel(this.id);

      eventTitle = eventModel.title;
      eventImagePath = eventModel.imagePath;
      eventDescription = eventModel.description;
      eventStart = <Date>eventModel.start;
      eventEnd = <Date>eventModel.end;
      eventIsAllDay = eventModel.isAllDay;
      eventUrl = eventModel.url;
    }

    this.eventForm = new FormGroup({
      'title': new FormControl(eventTitle, Validators.required),
      'start': new FormControl(eventStart, Validators.required),
      'end': new FormControl(eventEnd, Validators.required),
      'isAllDay': new FormControl(eventIsAllDay, Validators.required),
      'imagePath': new FormControl(eventImagePath, Validators.required),
      'description': new FormControl(eventDescription, Validators.required),
      'url': new FormControl(eventUrl)
    });
  }
  onAddItem() {
  }
}