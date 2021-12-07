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
    const URL = "https://cc7c-190-112-37-152.ngrok.io/vehicleRoutingFromLocations";

    return this.http.post<Observable<RoutingSolution>>(URL, data)
      .pipe(
        map(RoutingSolution.adapt)
      );
  }
}
