import { Subject, Subscription, Observable, from, of } from 'rxjs';
import { EventModelDTO } from './event.model';
import { EventsAPIService } from './events-api.service';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class EventService {
    eventsChanged = new Subject<EventModelDTO[]>();
    navigatedToEdit = new Subject<string>();
    private events: EventModelDTO[] = [];
    private filters: any = {}

    constructor(private _eventsAPIService: EventsAPIService) { }

    setEvents(events: EventModelDTO[]) {
        this.events = events;
        this.eventsChanged.next(this.events.slice());
    }
    getEvents(): Observable<EventModelDTO[]> {
        if (this.events && this.events.length !== 0) {
            return of(this.events);
        }
        else {
            return this._eventsAPIService.getEvents();
        }
    }
    getEventById(id: string): Observable<EventModelDTO> {
        var event = this.events.find(x => x.id === id);
        if (event) {
            return of(event);
        }
        return this._eventsAPIService.getEventById(id);
    }

    viewEvent(id: string) {
    }
    addEvent(event: EventModelDTO) {
        let events: EventModelDTO[] = [event];
        this._eventsAPIService.postEvents(events).subscribe((response: EventModelDTO[]) => {
            this.events.push(...response);
            this.eventsChanged.next(this.events.slice());
        });
    }
    updateEvent(id: string, eventModel: EventModelDTO) {
        const eventIndex = this.events.findIndex(event => event.id == id);
        if (eventIndex != -1) {
            let eventInput: EventModelDTO = this.events[eventIndex];
            eventInput.title = eventModel.title;
            //eventInput.start = eventModel.start;            
            eventInput.description = eventModel.description;
            //eventInput.extendedProps["updateDate"] = eventModel.updateDate;
            eventInput.imagePath = eventModel.imagePath;

            this.events[eventIndex] = eventInput;
            // this.events.map(event => {
            //     var temp = Object.assign({}, event);
            //     if (temp.id === id) {
            //         temp.title = eventModel.title;                       //     }
            //     return temp;
            // });        
            this.eventsChanged.next(this.events.slice());
        }
    }
    deleteEvent(id: string) {
        const eventIndex = this.events.findIndex(event => event.id == id);
        if (eventIndex != -1) {
            this.events.splice(eventIndex, 1);
            this.eventsChanged.next(this.events.slice());
        }
    }

    navigateToEdit(path: string) {
        this.navigatedToEdit.next(path);
    }
}