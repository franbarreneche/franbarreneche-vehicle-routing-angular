import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingSolution } from '../core/routing-solution';

@Injectable({
  providedIn: 'root'
})
export class VehicleRoutingService {

  constructor(private http: HttpClient) { }

  getRouting(data: any): Observable<RoutingSolution> {
    const URL = "http://localhost:8080/vehicleRoutingFromLocations";

    return this.http.post<Observable<RoutingSolution>>(URL, data)
      .pipe(
        map(RoutingSolution.adapt)
      );
  }
}
