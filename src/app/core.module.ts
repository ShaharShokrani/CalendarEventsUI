import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { EventService } from './events/event.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  providers: [    
    EventService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {}
