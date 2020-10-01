import { Injectable } from '@angular/core';
 
@Injectable({ 
    providedIn: 'root' 
})
export class ConfigService {    

    constructor() {}  
     
    get resourceApiURI() {
        return 'http://localhost:5000/api'; //Local
        //return 'http://localhost:5001/api'; //Docker
        //return 'https://calendareventsapi.azurewebsites.net'; //Production
    }
}