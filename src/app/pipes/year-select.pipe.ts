import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yearSelect'
})
export class YearSelectPipe implements PipeTransform {
  public yeartest = (new Date()).getFullYear();
  transform(year: number): any {
    var range = [];
    range.push(this.yeartest);
    for (var i = 1; i < 10; i++) {
      range.push(this.yeartest - i);
    }
    return range;
  }
}
