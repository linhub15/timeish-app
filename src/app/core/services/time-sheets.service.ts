import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TimeSheet } from '../models';
import { ApiService } from '.';

@Injectable({
  providedIn: 'root'
})
export class TimeSheetsService {
  
  readonly type = TimeSheet;    // could be injected 
  readonly resource: string = 'timesheets';  // could be injected

  constructor(private http: ApiService) { }

  // GET /api/timesheets
  list(): Observable<TimeSheet[]> {
    return this.http.list(this.resource, TimeSheet);
  }

  // GET /api/timesheets/{id}
  get(id: number): Observable<TimeSheet> {
    return this.http.get<TimeSheet>(this.resource, id, TimeSheet);
  }

  // POST
  add(timeSheet: TimeSheet): Observable<TimeSheet> {
    return this.http.add(this.resource, timeSheet, TimeSheet);
  }

  // PUT
  update(timeSheet: TimeSheet): Observable<TimeSheet> {
    return this.http.update(this.resource, timeSheet, TimeSheet);
  }

  // DELETE
  deleteTimeSheet(id: number): void {
    this.http.delete(this.resource, id).subscribe();
  }

  // DELETE
  deleteActivity(id: number): void {
    let resource = this.resource + '/activities';
    this.http.delete(resource, id).subscribe();
  }
}