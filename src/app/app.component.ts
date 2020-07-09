import { Component, OnInit } from "@angular/core";
import { MatDialog, MatSnackBar, MatSnackBarRef } from "@angular/material";
import { EnterFrequencyDialogComponent } from "./components/enter-frequency-dialog/enter-frequency-dialog.component";
import { take } from "rxjs/operators";
import { FormControl, Validators } from "@angular/forms";
import {
  Occurence,
  CalculateOccurenceService,
} from "./services/calculate-occurence.service";
import { FibonacciService } from "./services/fibonacci-service.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public frequency = 5;
  public newNumber = new FormControl(0, [Validators.required]);
  public rawNumbers = [];
  public currentOccurences: Occurence[] = [];
  public currentOccurenceMessage: string;
  public isPaused = false;
  public isDone = false;
  public currentSnackBarRef: MatSnackBarRef<any>;
  constructor(
    public dialog: MatDialog,
    public calculateOccurenceService: CalculateOccurenceService,
    private snackBar: MatSnackBar,
    private readonly fibonacciService: FibonacciService
  ) {}

  ngOnInit() {
    const frequencyRef = this.dialog.open(EnterFrequencyDialogComponent);
    frequencyRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) this.frequency = result;
        this.startTimer(this.frequency);
      });
  }

  private startTimer(duration: number) {
    /*
      This would have been nicer as a RXJS interval but ran out of time.
    */
    setInterval(() => {
      if (!this.isPaused && !this.isDone) {
        if (this.currentSnackBarRef) {
          this.currentSnackBarRef.dismiss();
        }
        this.currentOccurenceMessage = this.calculateOccurenceService.describeOccurence(
          this.currentOccurences
        );
        this.currentSnackBarRef = this.snackBar.open(
          this.currentOccurenceMessage,
          null,
          {
            duration: 3000,
          }
        );
      }
    }, duration * 1000);
  }

  public togglePlay() {
    this.isPaused = !this.isPaused;
    // close message if it's currently showing
    if (this.isPaused && this.currentSnackBarRef) {
      this.currentSnackBarRef.dismiss();
    }
  }

  public onSubmit() {
    if (this.newNumber.valid) {
      this.recordNumber(this.newNumber.value);
    }
  }

  private recordNumber(newNumber: number): void {
    if (!newNumber) {
      return;
    }
    this.rawNumbers.push(newNumber);
    // this function mutates the array so we pass a fresh copy
    this.currentOccurences = this.calculateOccurenceService.calculateOccurence([
      ...this.rawNumbers,
    ]);
    if (this.fibonacciService.isInFirst1000FibonacciNumbers(newNumber)) {
      window.alert("FIB");
    }
  }
}
