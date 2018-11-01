import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TimeSheet } from '../models';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class TimeSheetsService {
  
  readonly type = TimeSheet;    // could be injected 
  readonly resource: string = 'timesheets';  // could be injected

  constructor(private http: ApiService) { }

  list(): Observable<TimeSheet[]> {
    return this.http.list(this.resource, TimeSheet);
  }

  get(id: number): Observable<TimeSheet> {
    return this.http.get<TimeSheet>(this.resource, id, TimeSheet)
  }

  add(timeSheet: TimeSheet): Observable<TimeSheet> {
    return this.http.add(this.resource, timeSheet, TimeSheet);
  }

  update(timeSheet: TimeSheet): Observable<TimeSheet> {
    return this.http.put(this.resource, timeSheet, TimeSheet);
  }

  deleteTimeSheet(id: number): void {
    this.http.delete(this.resource, id).subscribe();
  }

  // Activity is related to Timesheet. One method doesn't warrant it's own service.
  deleteActivity(id: number): void {
    let resource = this.resource + '/activities';
    this.http.delete(resource, id).subscribe();
  }
}