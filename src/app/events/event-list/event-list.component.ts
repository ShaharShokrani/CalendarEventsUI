import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Calendar } from '@fullcalendar/core';
import { EventInput, EventApi, ToolbarInput, CalendarOptions } from '@fullcalendar/core';

import dayGridPlugin, { DayGridView } from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick

import { EventService } from '../events.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventModelDTO } from '../event.model';

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
  eventsInputs: EventInput[] = []; 

  private calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    initialEvents: this.eventsInputs, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    //select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    //eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
 

  constructor(private _eventService: EventService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { 
      const name = Calendar.name; // add this line in your constructor 
    }

  calendarVisible = true;  
  calendarWeekends = true;

  convertEventModelToEventInput(eventsModels: EventModelDTO[]): EventInput[] {

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

  ngOnInit() { 
    //TODOL Change it as in event-Details.
    const eventsModels = this._activatedRoute.snapshot.data["eventsResolverService"];
    if (eventsModels)
      this.eventsInputs = this.convertEventModelToEventInput(eventsModels);    

    this.eventsChangedSubscription = this._eventService.eventsChanged
    .subscribe(
      (eventsModels: EventModelDTO[]) => {
        this.eventsInputs = this.convertEventModelToEventInput(eventsModels);
      }
  );
  }

  ngAfterViewInit() { 
    //TODO: Add an issue to understand the difference between ngOnInit vs ngAfterViewInit usage.
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarComponent.options = this.calendarOptions;       
    
    this.navigatedToEditSubscription = this._eventService.navigatedToEdit
      .subscribe(
        (path: string) => {          
          this._router.navigate([path], {relativeTo: this._activatedRoute});
        }
      );

    this._activatedRoute.params
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
            this._router.navigate(['events', this.year, this.month, this.day]); 
          }
        }
      )
  }

  onViewItem(id: string) {
    this._eventService.navigatedToEdit
      .next(id);
  }

  handleEventClick(model: {el: Object, event: EventApi, jsEvent: MouseEvent, view: DayGridView}) {    
    this.onViewItem(model.event.id);
  } 

  handleDatesRender(arg: any): void {
    console.log("handleDatesRender(arg)", arg);
    let currentStart = arg.view.currentStart;    

    this.year = +this._activatedRoute.snapshot.params["year"];
    this.month = +this._activatedRoute.snapshot.params["month"];
    this.day = +this._activatedRoute.snapshot.params["day"];
    //The current navigated in-app route were from inside the calendar datesRender event
    if (this.year != currentStart.getFullYear() ||
        this.month != (currentStart.getMonth() + 1) ||
        this.day != currentStart.getDate()) {
          this.year = currentStart.getFullYear();
          this.month = (currentStart.getMonth() + 1);
          this.day = currentStart.getDate();
          this._router.navigate(['events', this.year, this.month, this.day]);
    }
  }

  ngOnDestroy() {
    this.eventsChangedSubscription.unsubscribe();
    this.navigatedToEditSubscription.unsubscribe();
  }
  
}
