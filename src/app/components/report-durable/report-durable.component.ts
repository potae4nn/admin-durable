import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ReportDurableService } from '../../services/report-durable.service';
import { ExcelService } from '../../services/excel.service';
import { DurableService, IDurable } from '../../services/durable.service';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-report-durable',
  templateUrl: './report-durable.component.html',
  styleUrls: ['./report-durable.component.css']
})
export class ReportDurableComponent implements OnInit, OnDestroy {
  private token: any;
  public decoded: any;
  public result: any;
  public durable: IDurable[] = [];
  public durableData: any[] = [];
  public duraData: IDurable[] = [];
  public yearDurableCheck: string = '';
  public dataExcel: any[] = [];
  public check: string = '';
  public users: any = [];
  public p: number = 1;
  public previousLabel: string = "ย้อนกลับ";
  public nextLabel: string = "ถัดไป";
  public currentPage: number = 1;
  public itemsPerPage: number = 50;
  public maxSize: number = 5;
  public limitpage: number = 100;
  public startpage: number = 1;
  public paginations: number[] = [];
  public searchDurable: string = '';
  public dataLength: number = 0;
  public statusFormArray: Array<any> = [];
  public categories = [
    { name: "ยังไม่ได้สำรวจ", id: '0' },
    { name: "ใช้งานได้", id: '1' },
    { name: "ชำรุดรอการซ่อม", id: '2' },
    { name: "ชำรุดเพื่อรอจำหน่าย", id: '3' },
    { name: "สูญหาย", id: '4' }
  ];
  public year = (new Date()).getFullYear();
  public d = new Date();
  public yearNow = this.d.getFullYear();
  public yearArray: any[] = [];
  public yearSelect: string = '';
  public displayStatus: string = 'none';
  public overflowStatus: string = 'auto';
  public display: string = 'none';
  public overflow: string = 'auto';
  public start: any;
  public last: any;
  public id_durable: number = 0;
  public StatusRadios: string = '';

  constructor(
    protected excelService: ExcelService,
    // private route: Router,
    private cookieService: CookieService,
    private reportDurableService: ReportDurableService,
    private durableService: DurableService,
    private usersService: UsersService,
  ) { }

  public exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.durableData, 'รายการครุภัณฑ์');
  }

  ngOnInit(): void {
    this.token = this.cookieService.get('Token_App_Durable');
    this.usersService.getUsers(this.token).subscribe(res => {
      this.users = res.data;
    });
    this.reportDurableService.getDurableReport(this.token, this.year, this.statusFormArray)
      .subscribe(async (response: any) => {
        try {
          this.durableData = await response.data;
          this.dataLength = this.durableData.length;
          this.initializeLoadPagination(this.durableData.length);
        } catch (error) {
          console.log(error);
        }
      });
    while (1940 <= Number(this.yearNow)) {
      this.yearArray.push(this.yearNow);
      this.yearNow--;
    }
  }

  public onYearChange(event: any) {
    this.year = event.value;
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    this.durableData;
  }

  public onToFormEditDurable(id: string) {
    this.durableService.getDurableId(id, this.token)
      .subscribe((res) => {
        this.durable.push(res.data[0]);
      });
    this.display = 'block';
    this.overflow = 'hidden';
  }

  public checkStatus(id: number) {
    this.id_durable = id;
    this.displayStatus = 'block';
    this.overflowStatus = 'hidden';
  }

  public onSaveStatus() {
    this.durableService.updateAndCheck(this.id_durable, this.StatusRadios, this.token)
      .subscribe((res) => {
        try {
          Swal.fire({
            title: 'แก้ไขสถานะครุภัณฑ์สำเร็จ',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this.StatusRadios = ''
            this.ngOnInit()
            this.onCloseHandled()
          })
        } catch (error) {
          console.log(error);
        }
      })
    // console.log(this.id_durable,this.StatusRadios)
  }

  public onCloseHandled() {
    this.durable = [];
    this.display = 'none';
    this.displayStatus = 'none';
  }

  public onSubmit() {
    this.durableService.putDurable(this.durable[0], this.token)
      .subscribe((res) => {
        try {
          Swal.fire({
            title: 'แก้ไขรายการครุภัณฑ์สำเร็จ',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this.ngOnInit()
            this.onCloseHandled()
          })
        } catch (error) {
          console.log(error);
        }
      });
  }

  public deleteDurable(id: any) {
    this.durableService.cancelDurable(id, this.token).subscribe(() => {
      try {
        Swal.fire({
          title: 'ลบการครุภัณฑ์สำเร็จ',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          this.ngOnInit()
          this.onCloseHandled()
        });
      } catch (error) {
        console.log(error);
      }
    })
  }

  public onLimitPageChange(event: any) {
    this.limitpage = event.target.value;
    this.initializeLoadPagination(this.durableData.length);
  }

  // คำนวนหน้า page
  public initializeLoadPagination(dataLength: any) {
    const pageLength = Math.ceil(dataLength / this.limitpage);
    this.paginations = [];
    for (let index = 1; index <= pageLength; index++) {
      this.paginations.push(index);
    }
  }

  //select 
  public onChange(id: any, isChecked: boolean) {
    if (isChecked) {
      this.statusFormArray.push(id);
      this.ngOnInit();
    } else {
      let index = this.statusFormArray.indexOf(id);
      this.statusFormArray.splice(index, 1);
      this.ngOnInit();
    }
  }

  public async selectAll() {
    let checkBoxes = await document.querySelectorAll<HTMLElement>('.form-check-input');
    checkBoxes.forEach(el => el.click());
    this.ngOnInit();
  }

  public getPaginItem(item: any) {
    const items = item;
    this.duraData = items;
    this.dataLength = item.length;
    console.log(this.dataLength)
    return items.slice((this.startpage - 1) * this.limitpage, this.startpage * this.limitpage);
  }

  showSearch() {
    this.durableService.search(this.searchDurable, this.token, this.year, this.statusFormArray).subscribe(async (res) => {
      this.durableData = await res.data;
    })
  }

  public onRefresh() {
    this.ngOnInit();
  }

  public prevPage() {
    if (this.startpage <= 1) return;
    this.startpage = this.startpage - 1
  }

  public nextPage() {
    if (this.startpage >= this.paginations.length) return;
    this.startpage = this.startpage + 1
  }

  public listCount(count: number) {
    this.start = count
    this.start = this.start * this.limitpage - (this.limitpage - 1)
    this.last = count * this.limitpage
    if (this.last > this.durableData.length) {
      this.last = this.durableData.length;
    }
  }
}
