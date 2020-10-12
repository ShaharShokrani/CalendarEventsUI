import { Subject, Subscription, Observable, from, of } from 'rxjs';
import { EventModelDTO } from './event.model';
import { EventsAPIService } from './events-api.service';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SearchRequest } from '../shared/models/search-request.model';

@Injectable()
export class EventService {    
    private eventsSubject = new Subject<EventModelDTO[]>();

    navigatedToEdit = new Subject<string>();    
    private eventModelDTOs: EventModelDTO[] = [];
    
    constructor(private _eventsAPIService: EventsAPIService) {}

    onEvents(): Observable<EventModelDTO[]> {
        return this.eventsSubject.asObservable();
    }
    setEvents(events) {
        console.log("EventService.setEvents", events);
        this.eventModelDTOs = events;
        this.eventsSubject.next(events);
    }
    searchEvents(filter: SearchRequest) : Observable<EventModelDTO[]> {
        if (this.eventModelDTOs.length !== 0) {
            return of(this.eventModelDTOs);
        }
        else {
            return this._eventsAPIService.getEvents(filter)
            .pipe(
                tap((eventModelDTOs: EventModelDTO[]) => {
                    this.setEvents(eventModelDTOs);
                })
            );
        }
    }
    getEventById(id: string) : Observable<EventModelDTO> {
        var event = this.eventModelDTOs.find(x => x.id === id);
        if (event) {
            return of(event);
        }
        return this._eventsAPIService.getEventById(id);
    }

    viewEvent(id: string) {        
    }
    insertEvent(EventModelDTO: EventModelDTO) {        
        this._eventsAPIService.insertEvents([EventModelDTO])
            .subscribe((eventModelDTOs: EventModelDTO[]) => {
                this.addEvents(eventModelDTOs);                                
            });
    }

    private addEvents(eventModelDTOs: EventModelDTO[]) {
        this.eventModelDTOs.push(...eventModelDTOs);
        this.eventsSubject.next(this.eventModelDTOs.slice());
    }
    
    updateEvent(id: string, eventModel: EventModelDTO) {
        const eventIndex = this.eventModelDTOs.findIndex(event => event.id == id);
        if (eventIndex != -1) {
            let eventInput: EventModelDTO = this.eventModelDTOs[eventIndex];            
            eventInput.title = eventModel.title;
            //eventInput.start = eventModel.start;            
            eventInput.description = eventModel.description;
            //eventInput.extendedProps["updateDate"] = eventModel.updateDate;
            eventInput.imagePath = eventModel.imagePath;

            this.eventModelDTOs[eventIndex] = eventInput;
            // this.events.map(event => {
            //     var temp = Object.assign({}, event);
            //     if (temp.id === id) {
            //         temp.title = eventModel.title;                       //     }
            //     return temp;
            // });        
            this.eventsSubject.next(this.eventModelDTOs.slice());
        }
    }
    deleteEvent(id: string) {
        const eventIndex = this.eventModelDTOs.findIndex(event => event.id == id);
        if (eventIndex != -1)
        {
            this.eventModelDTOs.splice(eventIndex, 1);
            this.eventsSubject.next(this.eventModelDTOs.slice());
        }
    }
    
    navigateToEdit(path: string) {
        this.navigatedToEdit.next(path);
    }
}