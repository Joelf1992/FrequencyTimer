import { Injectable } from "@angular/core";
export interface Occurence {
  key: string;
  occurence: number;
}

@Injectable({
  providedIn: "root",
})
export class CalculateOccurenceService {
  constructor() {}

  public calculateOccurence(rawNumbers: number[]): Occurence[] {
    const numOccurenceMap = {};
    // record numbers as a key value with the frequency attached
    rawNumbers.forEach((num) => {
      if (numOccurenceMap[num]) {
        numOccurenceMap[num]++;
      } else {
        numOccurenceMap[num] = 1;
      }
    });
    // now we need to sort by highest occurence
    rawNumbers.sort(
      (numA, numB) => numOccurenceMap[numB] - numOccurenceMap[numA]
    );

    // remove duplicates
    const uniques = rawNumbers.filter(
      (item, index) => rawNumbers.indexOf(item) === index
    );
    return uniques.map((uniqueNum) => ({
      key: uniqueNum.toString(),
      occurence: numOccurenceMap[uniqueNum],
    }));
  }

  public describeOccurence(occurences: Occurence[]): string {
    if (!occurences.length) {
      return "You haven't entered any numbers yet.";
    }
    return occurences
      .map((occurence) => {
        return `"${occurence.key}" occured ${occurence.occurence} times `;
      })
      .join(", ");
  }
}
