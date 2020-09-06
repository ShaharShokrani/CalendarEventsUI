import { Injectable } from '@angular/core'
import { 
    HttpInterceptor, 
    HttpRequest, 
    HttpHandler, 
    HttpParams,
    HttpHeaders,
    HttpEvent
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
    'providedIn': 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        if (this.authService.isAuthenticated) {
            const authorizationHeader = this.authService.authorizationHeaderValue;
            const modifiedReq = req.clone({ 
                headers: new HttpHeaders().set('Authorization', authorizationHeader)
            });
            return next.handle(modifiedReq);
        }
        else {
            return next.handle(req);
        }
    }
}