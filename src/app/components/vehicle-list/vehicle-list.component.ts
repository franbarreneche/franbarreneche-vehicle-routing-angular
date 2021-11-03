import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
import { Vehicle } from 'src/app/core/vehicle';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<Vehicle>;

  constructor(private toast: ToastService) { }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['n', 'capacity', 'start', 'end', 'actions'];

  vehicleList: Vehicle[] = [];

  dataSource = new VehicleDataSource(this.vehicleList);

  ngAfterViewInit(): void {
    this.table.dataSource = this.dataSource;
  }

  addVehicle(vehicle: Vehicle) {
    this.vehicleList = [
      ...this.vehicleList,
      vehicle
    ];
    this.dataSource.setData(this.vehicleList);
  }

  removeVehicle(vehicle: Vehicle) {
    this.vehicleList = this.vehicleList.filter(v => v != vehicle);
    this.dataSource.setData(this.vehicleList);
    this.toast.showMessage("El vehiculo fue eliminado");
  }

  getVehicles(): Vehicle[] {
    return this.vehicleList;
  }
}

class VehicleDataSource extends DataSource<Vehicle> {
  private _dataStream = new ReplaySubject<Vehicle[]>();

  constructor(initialData: Vehicle[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Vehicle[]> {
    return this._dataStream;
  }

  disconnect() { }

  setData(data: Vehicle[]) {
    this._dataStream.next(data);
  }
}
