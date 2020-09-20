import { Injectable } from '@angular/core';
 
@Injectable({ 
    providedIn: 'root' 
})
export class ConfigService {    

    constructor() {}

    get authority() {
        //return 'http://localhost:5001'; //Docker
        //return 'http://localhost:5002'; //Local
        return 'https://calendareventsidp.azurewebsites.net'; //Production
    }    
     
    get resourceApiURI() {
        //return 'http://localhost:5000/api'; //Docker
        //return 'http://localhost:5003/api'; //Local
        return 'https://calendareventsapi.azurewebsites.net'; //Production
    }

    get clientURI() {
        return 'https://localhost:4200/';
    }

    get client_id() {
        return 'calendareventsui';
    }
}