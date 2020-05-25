import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import dayGridPlugin, { DayGridView } from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { EventInput, EventApi, Calendar, View } from '@fullcalendar/core';

import { EventService } from '../event.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventModel } from '../event.model';
import { ToolbarInput } from '@fullcalendar/core/types/input-types';

@Component({
  selector: 'app-events-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('calendar', {'static': true}) calendarComponent: FullCalendarComponent;
  calendarApi: Calendar;
  defaultDate = new Date();
  timeZone = 'UTC';

  year: number;
  month: number;
  day: number;

  private eventsChangedSubscription: Subscription;
  private navigatedToEditSubscription: Subscription;
  eventsInputs: EventInput[];  

  constructor(private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute) { }

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;

  convertEventModelToEventInput(eventsModels: EventModel[]): EventInput[] {
    return Array.from(eventsModels, eventModel => {
      const eventInput: EventInput = {
        id: eventModel.id,
        start: eventModel.start,              
        title: eventModel.title,
        extendedProps: {
          "updateDate": eventModel.updateDate,
          "imagePath": eventModel.imagePath,
          "details": eventModel.details,
          "description": eventModel.description
        }
      };
      return eventInput;
    });
  }
  private toolBarInput : ToolbarInput = {    
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  }
  ngAfterViewInit() { 
    //TODO: Add an issue to understand the difference between ngOnInit vs ngAfterViewInit usage.
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarComponent.header = this.toolBarInput;
    this.calendarComponent.plugins = [ 'calendarPlugins', 'dayGrid', 'timeGrid' ];
        
    console.log(this.calendarComponent);
    console.log(this.calendarApi);
    
    this.navigatedToEditSubscription = this.eventService.navigatedToEdit
      .subscribe(
        (path: string) => {          
          this.router.navigate([path], {relativeTo: this.route});
        }
      );

    this.eventsChangedSubscription = this.eventService.eventsChanged
      .subscribe(
        (eventsModels: EventModel[]) => {
          this.eventsInputs = this.convertEventModelToEventInput(eventsModels)
        }
    );

    this.route.params
      .subscribe(
        (params: Params) => {          
          if ((params['year'] && params['month'] && params['day']) &&
              (+params['year'] != this.year ||
              +params['month'] != this.month ||
              +params['day'] != this.day))
          {
            this.year = +params['year'];
            this.month = +params['month'];
            this.day = params['day'];

            let goToDate = new Date(this.year, this.month, this.day);
            this.calendarApi.gotoDate(goToDate);
            //TODO: This navigated repeated here again in case the url has been pasted into the url bar, find a better way to handle it (it should be handled from only one place).
            this.router.navigate(['events', this.year, this.month, this.day]); 
          }
        }
      )
  }
  ngOnInit() {
    console.log("EventListComponent.ngOnInit");
    this.eventsInputs = this.eventService.getEvents();
  }

  onViewItem(id: string) {
    this.eventService.navigatedToEdit
      .next(id);
  }

  handleEventClick(model: {el: Object, event: EventApi, jsEvent: MouseEvent, view: DayGridView}) {
    console.log(model);
    this.onViewItem(model.event.id);

    console.log("this.calendarComponent");
    console.log(this.calendarComponent.defaultDate);
  } 

  handleDatesRender(arg: {view: View, el: HTMLElement }): void {
    let currentStart = arg.view.currentStart;
    
    console.log("params:");
    console.log(this.route.params);

    console.log("router:");
    console.log(this.router);

    this.year = +this.route.snapshot.params["year"];
    this.month = +this.route.snapshot.params["month"];
    this.day = +this.route.snapshot.params["day"];
    //The current navigated in-app route were from inside the calendar datesRender event
    if (this.year != currentStart.getFullYear() ||
        this.month != (currentStart.getMonth() + 1) ||
        this.day != currentStart.getDate()) {
          this.year = currentStart.getFullYear();
          this.month = (currentStart.getMonth() + 1);
          this.day = currentStart.getDate();
          this.router.navigate(['events', this.year, this.month, this.day]);
    }
  }

  ngOnDestroy() {
    this.eventsChangedSubscription.unsubscribe();
    this.navigatedToEditSubscription.unsubscribe();
  }

  // modifyTitle(eventIndex, newTitle) {
  //   this.calendarEvents[eventIndex].title = newTitle;
  // }

  // toggleVisible() {
  //   this.calendarVisible = !this.calendarVisible;
  // }

  // toggleWeekends() {
  //   this.calendarWeekends = !this.calendarWeekends;
  // }

  // gotoPast() {
  //   let calendarApi = this.calendarComponent.getApi();
  //   calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
  // }

  // handleDateClick(arg) {
  //   if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
  //     this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
  //       title: 'New Event',
  //       start: arg.date,
  //       allDay: arg.allDay
  //     })
  //   }
  // }

  // onEventInputSelected(calendarEventInput: CalendarEventInput) {
  //   this.calendarEventInputWasSelected.emit(calendarEventInput);
  // }
}
