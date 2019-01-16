import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  navTitle: string;
  links: Link[] = [];
  authenticated: boolean = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) { }

  ngOnInit() {
    this.links.push(new Link('/timesheets', 'Time Sheets'));
    this.links.push(new Link('/employees', 'Employees'));
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(()=>this.activatedRoute),
      map((route)=> {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      flatMap((route) => route.data))
      .subscribe((event) => {
        this.titleService.setTitle(event['title']);
        this.navTitle = event['title'];
      });
  }

  toggleSideNav(toggled: boolean) {
    if (!toggled) { return }
    this.sidenav.toggle();
  }
  closeSideNav() {
    this.sidenav.close();
  }
}

export class Link {
  constructor(
    public url: string, 
    public text: string)
    {}
}