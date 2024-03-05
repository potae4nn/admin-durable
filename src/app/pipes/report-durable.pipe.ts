import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reportDurable'
})
export class ReportDurablePipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  transform(num: any): any {
    let status
    // console.log(num);
    if (num !== null) {
      switch (num) {
        case "1":
          status = 'ใช้งานได้'
          break;

        case "2":
          status = 'ชำรุดรอการซ่อม'
          break;

        case "3":
          status = 'ชำรุดเพื่อจำหน่าย'
          break;

        case "4":
          status = 'สูญหาย'
          break;

        default:
          break;
      }
    } else {
      status = "ยังไม่ได้สำรวจ"
    }
    return status;
  }

}
