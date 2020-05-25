import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
          console.log(this.editMode);
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
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  initForm() {
    let eventTitle = '';
    let eventImagePath = '';
    let eventDescription = '';
    let evenrStart = new Date();

    if (this.editMode) {
      const eventModel = this.eventService.getEventModel(this.id);
      eventTitle = eventModel.title;
      eventImagePath = eventModel.imagePath;
      eventDescription = eventModel.description;
      evenrStart = <Date>eventModel.start;
    }
    
    this.eventForm = new FormGroup({
      'title': new FormControl(eventTitle, Validators.required),
      'start': new FormControl(evenrStart, Validators.required),
      'imagePath': new FormControl(eventImagePath, Validators.required),
      'description': new FormControl(eventDescription, Validators.required)      
    });
  }
  onAddItem() {
  }
}