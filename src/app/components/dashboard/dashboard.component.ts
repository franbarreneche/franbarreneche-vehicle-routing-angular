import { Component, ViewChild } from '@angular/core';
import { Site } from 'src/app/core/site';
import { Vehicle } from 'src/app/core/vehicle';
import { SiteListComponent } from '../site-list/site-list.component';
import { VehicleListComponent } from '../vehicle-list/vehicle-list.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild('siteTable') siteTable!: SiteListComponent;
  @ViewChild('vehicleTable') vehicleTable!: VehicleListComponent;

  constructor(public dialog: MatDialog) { }

  sites: Site[] = [];
  vehicles: Vehicle[] = [];

  mapCenter = {
    lat: -37.458848288870364,
    lng: -61.929054597285784
  }

  addVehicle() {
    let vehicle = new Vehicle(15, 0, 0);
    this.vehicleTable.addVehicle(vehicle);
  }

  addSite() {
    let site = new Site(this.mapCenter.lat, this.mapCenter.lng, 10);
    this.sites.push(site);
    this.sites = [...this.sites];
  }

  openModal() {
    let locations = this.sites.map(site => { return { lat: site.lat, lng: site.lng } });
    let demands = this.sites.map(site => site.demand);
    let vehicles = this.vehicleTable.getVehicles();
    let vehicleNumber = vehicles.length;
    let vehicleCapacities = vehicles.map(v => v.capacity);
    let starts = vehicles.map(v => v.start);
    let ends = vehicles.map(v => v.end);

    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      width: '250px',
      data: {
        locations: locations,
        demands: demands,
        vehicleNumber: vehicleNumber,
        vehicleCapacities: vehicleCapacities,
        starts: starts,
        ends: ends,
        seconds: 5,
        allowDropping: false,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
