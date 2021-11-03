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
  ends: number;
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

  calcRoutes() {
    this.routingService.getRouting(this.data).subscribe(
      data => console.log(data)
    );
  }
}