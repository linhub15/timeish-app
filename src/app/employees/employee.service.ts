import { Injectable, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable, of, from } from 'rxjs';
import { HttpService } from '../core/http.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements OnInit {

  readonly resource: string = 'employees'

  constructor(private api: HttpService) { }
  ngOnInit() {}
  getEmployees(): Observable<Employee[]> {
    return this.api.list<Employee>(this.resource, Employee);
  }

  add(employee: Employee): Observable<Employee> {
    return this.api.add(this.resource, employee, Employee);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(this.resource, id);
  }

  update(employee: Employee): Observable<any> {
   return this.api.update(this.resource, employee, Employee);
  }
}
