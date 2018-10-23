import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() title: string = 'Time-ish App';
  constructor() { }

  @Output() toggleSidenav = new EventEmitter<boolean>();

  ngOnInit() {
  }

  sidenavToggled() {
    this.toggleSidenav.emit(true);
  }
  
}
