import { Component, ViewChild } from '@angular/core';
import { Site } from 'src/app/core/site';
import { Vehicle } from 'src/app/core/vehicle';
import { SiteListComponent } from '../site-list/site-list.component';
import { VehicleListComponent } from '../vehicle-list/vehicle-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild('siteTable') siteTable!: SiteListComponent;
  @ViewChild('vehicleTable') vehicleTable!: VehicleListComponent;

  constructor() { }

  sites: Site[] = [];
  vehicles: Vehicle[] = [];

  mapCenter = {
    lat: -37.458848288870364,
    lng: -61.929054597285784
  }

  newSite(site: Site) {
    this.siteTable.addSite(site);
  }

  addVehicle() {
    let vehicle = new Vehicle(15, 0, 0);
    this.vehicleTable.addVehicle(vehicle);
  }

  addSite() {
    let site = new Site(this.mapCenter.lat, this.mapCenter.lng, 10);
    this.siteTable.addSite(site);
    this.sites = this.siteTable.getSites();
  }
}
