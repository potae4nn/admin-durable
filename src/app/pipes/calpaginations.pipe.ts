import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calpaginations'
})
export class CalpaginationsPipe implements PipeTransform {

  transform(startpage: any, paginations: any[]): any {
    console.log(paginations);
    console.log(startpage);
    const limitPagination = 10;
    let slicePage = [];
    if (startpage >= 1 && startpage < limitPagination) {
      slicePage = paginations.slice(0, 10)
      console.log(slicePage);
    } else if (startpage > limitPagination - 1 && startpage < (limitPagination + limitPagination) - 1) {
      slicePage = paginations.slice(limitPagination - 2, (limitPagination + limitPagination) - 1)
    } else if (startpage > 18) {
      slicePage = paginations.slice(17, paginations.length)
    }
    return slicePage;
  }

}
