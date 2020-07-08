import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FibonacciService {
  private fibonacciNumbers = [0, 1];
  constructor() {
    for (var i = 2; i < 1000; i++) {
      // Next fibonacci number = previous + one before previous
      // Translated to JavaScript:
      this.fibonacciNumbers[i] =
        this.fibonacciNumbers[i - 2] + this.fibonacciNumbers[i - 1];
    }
  }

  public isInFirst1000FibonacciNumbers(numberToCheck: number): boolean {
    return this.fibonacciNumbers.includes(numberToCheck);
  }
}
