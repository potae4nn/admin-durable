import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertYear'
})
export class ConvertYearPipe implements PipeTransform {

  transform(year:any): number {
    let yearThai = Number(year) + 543;
    return yearThai;
  }

}
