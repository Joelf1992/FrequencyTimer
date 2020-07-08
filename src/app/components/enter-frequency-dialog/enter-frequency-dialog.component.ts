import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { DialogRole, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-enter-frequency-dialog",
  templateUrl: "./enter-frequency-dialog.component.html",
  styleUrls: ["./enter-frequency-dialog.component.sass"],
})
export class EnterFrequencyDialogComponent implements OnInit {
  public frequency = new FormControl(10, [
    Validators.required,
    Validators.min(1),
  ]);
  constructor(
    public readonly dialogRef: MatDialogRef<EnterFrequencyDialogComponent>
  ) {}

  ngOnInit() {}

  public onSubmit() {
    if (this.frequency.valid) {
      this.dialogRef.close(this.frequency.value);
    }
  }
}
