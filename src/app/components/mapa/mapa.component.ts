import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Site } from 'src/app/core/site';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {
  @Input('latitude')
  lat: number = 28.704060;

  @Input('longitude')
  lng: number = 77.102493;;

  @Input('zoom')
  zoom: number = 15;

  @Input('sites')
  sites: Site[] = [];

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

  @Output() siteAdd: EventEmitter<Site> = new EventEmitter<Site>();

  constructor() { }



}
