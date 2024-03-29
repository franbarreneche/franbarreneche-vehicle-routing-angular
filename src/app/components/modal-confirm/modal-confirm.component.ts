import { Component, Inject } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VehicleRoutingService } from 'src/app/services/vehicle-routing.service';

export interface DialogData {
  locations: { lat: number, lng: number }[];
  demands: number[];
  vehicleNumber: number;
  vehicleCapacities: number[];
  starts: number[];
  ends: number[];
  allowDropping: boolean;
  seconds: number;
}

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private routingService: VehicleRoutingService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get solution() {
    // this.routingService.getRouting(this.data).subscribe(
    //   (solution: RoutingSolution) => {
    //     this.dialogRef.close();
    //     return solution;
    //   },
    //   error => console.log(error)
    // );
    return this.routingService.getRouting(this.data);
  }

  check(): boolean {
    let checkLeng = (this.data.locations.length > 0);
    let checkDemand = (this.data.demands && this.data.demands.length > 0);
    let checkVehicle = (this.data.vehicleNumber > 0);
    let checkCapacities = (this.data.vehicleCapacities.length == this.data.vehicleNumber);
    let checkStarts = (this.data.starts.length == this.data.vehicleNumber);
    let checkEnds = (this.data.ends.length == this.data.vehicleNumber);
    let checkSeconds = !isNaN(this.data.seconds) && (this.data.seconds > 0) && (this.data.seconds < 30);
    return checkLeng && checkDemand && checkVehicle && checkCapacities
      && checkStarts && checkEnds && checkSeconds;
  }
}
