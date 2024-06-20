import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginations'
})
export class PaginationsPipe implements PipeTransform {

  transform(item: any[], startpage: number, limitpage: number): any {
    // console.log(item.slice((startpage - 1) * limitpage, startpage * limitpage));
    return item.slice((startpage - 1) * limitpage, startpage * limitpage);
  }

}
