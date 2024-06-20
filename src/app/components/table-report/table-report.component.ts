import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-report',
  templateUrl: './table-report.component.html',
  styleUrls: ['./table-report.component.css']
})
export class TableReportComponent implements OnInit {
  public d = new Date();
  public yearNow = this.d.getFullYear();
  public yearArray: any[] = [];
  public yearSelect: string = '';

  constructor() { }

  ngOnInit(): void {
    while (1940 <= Number(this.yearNow)) {
      this.yearArray.push(this.yearNow);
      this.yearNow--;
    }
  }

  onSelectYear(){
    console.log(this.yearSelect);
  }

}
