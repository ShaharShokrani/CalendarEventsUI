import { DateInput } from '@fullcalendar/core/datelib/env';

export class EventModelDTO {
  public id: string;
  public imagePath: string;  
  public updateDate: Date;
  public title: string;
  public description: string;
  public start: DateInput;
  public end: DateInput;
  public isAllDay: boolean;
  public url: string;
  public details: any[];

  constructor (
    id: string,
    imagePath: string,   
    updateDate: Date,
    title: string, 
    start: DateInput,
    end: DateInput,
    description: string,
    isAllDay: boolean,
    url: string,
    details: any[]
  ) 
  {
    this.id = id;
    this.imagePath = imagePath;    
    this.updateDate = updateDate;
    this.title = title;
    this.start = start;  
    this.end = end;
    this.description = description;
    this.isAllDay = isAllDay;
    this.url = url;
    this.details = details;
  }
}