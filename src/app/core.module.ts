import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { EventService } from './events/event.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { DataStorageService } from './shared/data-storage.service';
import { EventsResolverService } from './events/events-resolver.service';

@NgModule({
  providers: [    
    EventService,
    DataStorageService,
    EventsResolverService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {}
