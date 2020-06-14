import { Injectable } from '@angular/core'
import { 
    HttpInterceptor, 
    HttpRequest, 
    HttpHandler, 
    HttpParams
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authorizationHeader = this.authService.authorizationHeaderValue;
        const modifiedReq = req.clone({ 
            params: new HttpParams().set('authorization', authorizationHeader)
        });
        return next.handle(modifiedReq);
    }
}