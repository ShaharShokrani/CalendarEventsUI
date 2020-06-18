import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../events/event.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
  // styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  private userSub: Subscription;
  collapsed: boolean = false;
    
  constructor(
    private eventService: EventService,
    private dataStorageService: DataStorageService,
    private authService: AuthenticationService ) { }

  ngOnInit() {
    this.userSub = this.authService.authNavStatus$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }
  onSaveData() {
    this.dataStorageService.storeEvents();
  }
  onFetchData() {
    this.dataStorageService.fetchEvents().subscribe();
  }
  onNewClick() {
    this.eventService.navigateToEdit("./new");
  }
  onSignInClick() {
    this.authService.signin();
  }
  onLogout() {
    this.authService.signout();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
