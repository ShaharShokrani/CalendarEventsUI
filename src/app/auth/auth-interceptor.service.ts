import { Injectable } from '@angular/core'
import { 
    HttpInterceptor, 
    HttpRequest, 
    HttpHandler, 
    HttpParams,
    HttpHeaders
} from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthenticationService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authorizationHeader = this.authService.authorizationHeaderValue;
        const modifiedReq = req.clone({ 
            headers: new HttpHeaders().set('Authorization', authorizationHeader)
        });
        return next.handle(modifiedReq);
    }
}