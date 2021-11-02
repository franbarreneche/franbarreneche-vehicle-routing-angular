import { DataSource } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Observable, of, ReplaySubject } from 'rxjs';
import { Site } from 'src/app/core/site';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent {
  @ViewChild(MatTable) table!: MatTable<Site>;

  sites: Site[] = [];

  dataSource = new SiteDataSource(this.sites);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['n', 'latLng', 'depot', 'demand', 'buttons'];

  constructor(private toast: ToastService) { }

  addSite(site: Site) {
    this.sites.push(site);
    this.dataSource.setData(this.sites);
  }

  setAsDepot(site: Site) {
    site.isDepot = true;
    site.demand = 15;
  }

  unsetAsDepot(site: Site) {
    site.isDepot = false;
  }

  removeSite(site: Site) {
    this.sites = this.sites.filter(s => s != site);
    console.log(this.sites);
    this.dataSource.setData(this.sites);
    this.toast.showMessage("El sitio fue eliminado");
  }

}

class SiteDataSource extends DataSource<Site> {
  private _dataStream = new ReplaySubject<Site[]>();

  constructor(initialData: Site[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Site[]> {
    return this._dataStream;
  }

  disconnect() { }

  setData(data: Site[]) {
    this._dataStream.next(data);
  }
}
