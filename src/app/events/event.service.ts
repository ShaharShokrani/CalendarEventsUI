import { Subject } from 'rxjs';
import { EventModel } from './event.model';

export class EventService {
    eventsChanged = new Subject<EventModel[]>();
    navigatedToEdit = new Subject<string>();
    private events: EventModel[] = [];
    
    setEvents(events: EventModel[]) {
        this.events = events;
        this.eventsChanged.next(this.events.slice());
    }
    getEvents() : EventModel[] {
        //Array.from(this.events, x => new EventModel(x.id,))
        return this.events;
    }
    getEventModel(id: string) : EventModel {
        var event = this.events.find(x => x.id === id);        
        return event;
    }

    viewEvent(id: string) {        
    }
    addEvent(event: EventModel) {
        this.events.push(event);
        this.eventsChanged.next(this.events.slice());
    }
    updateEvent(id: string, eventModel: EventModel) {
        const eventIndex = this.events.findIndex(event => event.id == id);
        if (eventIndex != -1) {
            let eventInput: EventModel = this.events[eventIndex];            
            eventInput.title = eventModel.title;
            //eventInput.start = eventModel.start;            
            eventInput.description = eventModel.description;
            //eventInput.extendedProps["updateDate"] = eventModel.updateDate;
            eventInput.imagePath = eventModel.imagePath;

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
    deleteEvent(id: string) {
        const eventIndex = this.events.findIndex(event => event.id == id);
        if (eventIndex != -1)
        {
            this.events.splice(eventIndex, 1);
            this.eventsChanged.next(this.events.slice());
        }
    }
    
    navigateToEdit(path: string) {
        this.navigatedToEdit.next(path);
    }
}