import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../events/events.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
  // styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // @Output() featureSelected = new EventEmitter<string>();
  // collapsed = true;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService) { }

  // ngOnInit() {
  //   console.log("HeaderComponent.ngOnInit");
  // }

  onNewClick() {
    this.eventService.navigateToEdit("./new");
  }
  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature);
  // }
}
