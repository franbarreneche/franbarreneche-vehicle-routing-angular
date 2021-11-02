import { Component, ViewChild } from '@angular/core';
import { Site } from 'src/app/core/site';
import { SiteListComponent } from '../site-list/site-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild('siteTable') siteTable!: SiteListComponent;

  constructor() { }

  newSite(site: Site) {
    this.siteTable.addSite(site);
  }
}
