import { Subject } from 'rxjs';

import { EventInput } from '@fullcalendar/core';

import { EventModel } from './event.model';

export class EventService {
    eventsChanged = new Subject<EventInput[]>();
    navigatedToEdit = new Subject<string>();    
    private events: EventInput[] = [
        { 
            id: "my-event",
            title: 'Event Now',
            start: new Date(),            
            extendedProps: {
                "description": "Some description..",
                "imagePath": "https://cdn.pixabay.com/photo/2019/12/21/18/07/concert-4710946_960_720.jpg",
                "updateDate": new Date()
            }
        }
    ];
    
    getEvents() {         
        return this.events;
    }
    getEventModel(id: string) : EventModel {
        var event = this.events.find(x => x.id === id);
        console.log("Event!");
        console.log(event);
        if (event) {
            return new EventModel(<string>event.id, event.extendedProps["imagePath"], event.extendedProps["updateDate"], event.title, event.start, event.extendedProps["description"]);
        } 
        else {
            return null;
        }
    }

    viewEvent(id: string) {        
    }
    addEvent(event: EventInput) {
        this.events.push(event);
        this.eventsChanged.next(this.events.slice());
    }
    updateEvent(id: string, eventModel: EventModel) {
        const eventIndex = this.events.findIndex(event => event.id == id);
        if (eventIndex != -1) {
            let eventInput: EventInput = this.events[eventIndex];            
            eventInput.title = eventModel.title;
            //eventInput.start = eventModel.start;            
            eventInput.extendedProps["description"] = eventModel.description;
            //eventInput.extendedProps["updateDate"] = eventModel.updateDate;
            eventInput.extendedProps["imagePath"] = eventModel.imagePath;

            this.events[eventIndex] = eventInput;
            // this.events.map(event => {
            //     var temp = Object.assign({}, event);
            //     if (temp.id === id) {
            //         temp.title = eventModel.title;                
            //     }
            //     return temp;
            // });        
            this.eventsChanged.next(this.events.slice());
        }
    }
    deleteEvent(index: number) {
        this.events.splice(index, 1);
        this.eventsChanged.next(this.events.slice());
    }
    addIngredients(events: EventInput[]) {
        this.events.push(...events);
        this.eventsChanged.next(this.events.slice());
    }
    navigateToEdit(path: string) {
        this.navigatedToEdit.next(path);
    }
}