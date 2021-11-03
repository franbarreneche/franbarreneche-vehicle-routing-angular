import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
import { Site } from 'src/app/core/site';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<Site>;

  constructor(private toast: ToastService) { }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['n', 'latlng', 'depot', 'demand', 'actions'];

  siteList: Site[] = [];

  dataSource = new SiteDataSource(this.siteList);

  ngAfterViewInit(): void {
    this.table.dataSource = this.dataSource;
  }

  addSite(site: Site) {
    this.siteList = [
      ...this.siteList,
      site
    ];
    this.dataSource.setData(this.siteList);
  }

  removeSite(site: Site) {
    this.siteList = this.siteList.filter(v => v != site);
    this.dataSource.setData(this.siteList);
    this.toast.showMessage("El sitio fue eliminado");
  }

  setAsDepot(site: Site) {
    site.isDepot = true;
    site.demand = 0;
  }

  unsetAsDepot(site: Site) {
    site.isDepot = false;
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
