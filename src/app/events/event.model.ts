import { DateInput } from '@fullcalendar/core/datelib/env';

export class EventModel {
  public id: string | number;
  public imagePath: string;  
  public updateDate: Date;
  public title: string;
  public description: string;
  public start: DateInput;
  public details: any[];

  constructor(
    id: string | number,
    imagePath: string,     
    updateDate: Date,
    title: string, 
    start: DateInput,
    description: string,
    details: any[]
  ) 
  {
    this.id = id;
    this.imagePath = imagePath;    
    this.updateDate = updateDate;
    this.title = title;
    this.start = start;  
    this.description = description;
    this.details = details;
  }
}