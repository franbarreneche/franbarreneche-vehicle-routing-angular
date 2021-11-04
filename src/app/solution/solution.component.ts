import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Site } from '../core/site';
import { Vehicle } from '../core/vehicle';
import { RoutingSolution } from '../core/routing-solution';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { Route } from '../core/route';

export interface SolutionData {
  sites: Site[],
  vehicles: Vehicle[],
  solution: RoutingSolution
}

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})
export class SolutionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SolutionData) {
  }

  colors: string[] = [
    "#f94144",
    "#90be6d",
    "#43aa8b",
    "#4d908e",
    "#577590",
    "#f3722c",
    "#f8961e",
    "#f9844a",
    "#f9c74f",
    "#277da1"
  ];

  infoWindow = {
    lat: 0,
    lng: 0,
    isOpen: false,
    title: "",
    distance: 0,
    load: 0
  }

  styles: google.maps.MapTypeStyle[] = [
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "administrative",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
  ];

  ngOnInit(): void {
  }

  openInfo(event: any, vehicleIndex: number, route: Route) {
    console.log(event);
    this.infoWindow.lat = event.latLng.lat();
    this.infoWindow.lng = event.latLng.lng();
    this.infoWindow.isOpen = true;
    this.infoWindow.title = `Ruta para vehiculo ${vehicleIndex}`;
    this.infoWindow.distance = route.distanceOfTheRoute;
    this.infoWindow.load = route.loadOfTheRoute;
  }

  closeInfo() {
    this.infoWindow.isOpen = false;
  }

}
