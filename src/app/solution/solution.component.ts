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
    "#81F564",
    "#F26682",
    "#476BFC",
    "#277da1",
    "#9kbe6d",
    "#43aa8b",
    "#4d9k8e",
    "#57759k",
    "#f3722c",
    "#f8961e",
    "#f9844a",
    "#f9c74f",
    "#277da1",
    "#f94144",
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

  ngOnInit(): void {
    for (let k = 0; k < this.data.vehicles.length; k++) {
      let startIndex = this.data.vehicles[k].start;
      let endIndex = this.data.vehicles[k].end;

      this.origin.push({
        lat: this.data.sites[startIndex].lat,
        lng: this.data.sites[startIndex].lng
      });

      this.destination.push({
        lat: this.data.sites[endIndex].lat,
        lng: this.data.sites[endIndex].lng,
      });

      let points: google.maps.DirectionsWaypoint[] = [];
      this.data.solution.routes[k].path.forEach((step, i) => {
        if ((i !== 0) && (i !== this.data.solution.routes[k].path.length - 1)) {
          let site = this.data.sites[step.locationIndex];
          points.push({
            location: new google.maps.LatLng(site.lat, site.lng),
            stopover: true
          });
        }
      });
      this.waypoints.push(points);
    }
  }

  origin: { lat: number, lng: number }[] = [];
  destination: { lat: number, lng: number }[] = [];

  waypoints: google.maps.DirectionsWaypoint[][] = [];
  options = [
    {
      polylineOptions: {
        strokeColor: "#81F564",
      },
      markerOptions: {
        visible: false,
      }
    },
    {
      polylineOptions: {
        strokeColor: "#F26682",
      },
      markerOptions: {
        visible: false,
      }
    },
    {
      polylineOptions: {
        strokeColor: "#476BFC",
      },
      markerOptions: {
        visible: false,
      }
    },
    {
      polylineOptions: {
        strokeColor: "#43aa8b",
      },
      markerOptions: {
        visible: false,
      }
    },
    {
      polylineOptions: {
        strokeColor: "#4d9k8e",
      },
      markerOptions: {
        visible: false,
      }
    },
    {
      polylineOptions: {
        strokeColor: "#57759k",
      },
      markerOptions: {
        visible: false,
      }
    },
    {
      polylineOptions: {
        strokeColor: "#f3722c",
      },
      markerOptions: {
        visible: false,
      }
    },
    {
      polylineOptions: {
        strokeColor: "#f8961e",
      },
      markerOptions: {
        visible: false,
      }
    },
    {
      polylineOptions: {
        strokeColor: "#f9844a",
      },
      markerOptions: {
        visible: false,
      }
    },
    {
      polylineOptions: {
        strokeColor: "#f9c74f",
      },
      markerOptions: {
        visible: false,
      }
    },
  ]
}
