import { Injectable } from '@angular/core';
 
@Injectable()
export class ConfigService {    

    constructor() {}

    get authority() {
        return 'https://localhost:5001/';
    }    
     
    get resourceApiURI() {
        return 'http://localhost:5000/api/';
    }

    get clientURI() {
        return 'https://localhost:4200/';
    }

    get client_id() {
        return 'calendareventsui';
    }
}