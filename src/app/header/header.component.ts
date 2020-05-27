import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../events/event.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

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
    private authService: AuthService ) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
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
  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
