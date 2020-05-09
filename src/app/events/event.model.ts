import { DateInput } from '@fullcalendar/core/datelib/env';

export class EventModel {
  public id: string | number;
  public imagePath: string;  
  public updateDate: Date;
  public title: string;
  public description: string;
  public start: DateInput;

  constructor(
    id: string | number,
    imagePath: string,     
    updateDate: Date,
    title: string, 
    start: DateInput,
    description: string
  ) 
  {
    this.id = id;
    this.imagePath = imagePath;    
    this.updateDate = updateDate;
    this.title = title;
    this.start = start;  
    this.description = description;
  }
}