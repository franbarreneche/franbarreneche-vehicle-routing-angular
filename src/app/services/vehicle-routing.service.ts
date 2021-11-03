import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleRoutingService {

  constructor(private http: HttpClient) { }

  getRouting(data: any): Observable<any> {
    const URL = "http://localhost:8080/vehicleRoutingFromLocations";

    return this.http.post(URL, data);
  }
}
