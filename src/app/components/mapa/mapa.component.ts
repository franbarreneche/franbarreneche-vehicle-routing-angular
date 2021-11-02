import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Site } from 'src/app/core/site';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  @Input('latitude')
  lat: number;

  @Input('longitude')
  lng: number;

  zoom: number;

  map: any;
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

  markerList: google.maps.Marker[] = [];

  @Output() siteAdd: EventEmitter<Site> = new EventEmitter<Site>();

  constructor() {
    this.lat = 28.704060;
    this.lng = 77.102493;
    this.zoom = 15;
  }

  ngOnInit(): void {
  }

  initMap(map: any) {
    this.map = map;
    this.map.setOptions(this.styles);
    this.map.addListener('rightclick', this.createSite.bind(this));
  }

  createSite(event: any) {
    let newLatLng: google.maps.LatLngLiteral =
    {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
    const marker = new google.maps.Marker({
      position: newLatLng,
      map: this.map,
      title: "Hello World!",
    });
    //agregamos el marker a la lista de markers
    this.markerList.push(marker);
    //finalmente emitimos el evento de que se creo nuevo sitio
    let site = new Site(newLatLng.lat, newLatLng.lng);
    this.siteAdd.emit(site);
  }



}
