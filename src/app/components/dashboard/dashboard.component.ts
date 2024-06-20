import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ReportDurableService, ICount } from '../../services/report-durable.service';
import { Chart, registerables } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables);
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public dataDurableCount: any;
  public dataDurableStatus: any;

  private token: any;
  public decoded: any;
  public result: any;
  public chart!: Chart;
  public chart2!: Chart;
  public chartPie!: Chart;
  // public chartPie2!: Chart;
  // public chartPie3!: Chart;
  // public chartPie4!: Chart;
  // public chartPie5!: Chart;
  public year = new Date().getFullYear();

  public d = new Date();
  public yearNow = this.d.getFullYear();
  public yearArray: any[] = [];
  public yearSelect: string = '';
  public labelsBarChart: any[] = ["ใช้งานได้", "ชำรุดเพื่อรอการซ่อม", "ชำรุดเพื่อรอจำหน่าย", "สูญหาย"]
  public dataResult: any;
  public labelDataUsername: any = []
  public countStatus: any = []
  public countDurable: any = []
  public leftDurable: any = []

  constructor(
    private cookieService: CookieService,
    public reportDurableService: ReportDurableService,
  ) { }

  ngOnInit(): void {
    this.token = this.cookieService.get('Token_App_Durable');
    this.reportDurableService.getDurableStatusCount(this.token, this.year)
      .subscribe(res => {
        this.dataDurableStatus = res;
        let statusCount = this.dataDurableStatus.count;
        this.chart = new Chart("canvas", {
          type: "bar",
          data: {
            labels: this.labelsBarChart,
            datasets: [
              {
                label: "ครุภัณฑ์ที่สำรวจ",
                data: [
                  statusCount.countMatchOne === undefined ? 0 : statusCount.countMatchOne,
                  statusCount.countMatchTwo === undefined ? 0 : statusCount.countMatchTwo,
                  statusCount.countMatchThree === undefined ? 0 : statusCount.countMatchThree,
                  statusCount.countMatchFour === undefined ? 0 : statusCount.countMatchFour
                ],
                backgroundColor: [
                  "rgba(194, 24, 91, 0.9)",
                  "rgba(248, 203, 46, 0.9)",
                  "rgba(238, 80, 7, 0.9)",
                  "rgba(255, 255, 255, 0.9)",
                ],
                borderColor: [
                  "rgba(194, 24, 91, 1)",
                  "rgba(248, 203, 46, 1)",
                  "rgba(238, 80, 7, 1)",
                  "rgba(255, 255, 255, 1)",
                ],
                borderWidth: 1
              }
            ],

          },
          options: {
            responsive: false,
            scales: {
              xAxis: {
                ticks: {
                  color: "#ffffff",
                  font: {
                    family: "'Kanit', sans-serif"
                  },
                }
              },
              yAxis: {
                ticks: {
                  color: "#ffffff",
                  font: {
                    family: "'Kanit', sans-serif"
                  },
                }
              }
            },
            color: "#ffffff",
            plugins: {
              datalabels: {
                color: '#ffffff',
                align: 'end',
                anchor: 'end',
                font: {
                  weight: 'bold',
                  family: "'Kanit', sans-serif"
                },
                offset: 8,
                padding: 6,
              },
              legend: {
                labels: {
                  color: "#ffffff",
                  // This more specific font property overrides the global property
                  font: {
                    size: 15,
                    family: "'Kanit', sans-serif"
                  }
                }
              }
            }
          }
        }
        );
      });
    // pieChart
    this.reportDurableService.getDurableChart(this.token, this.year).subscribe(res => {
      // console.log(res);
      this.dataDurableCount = res;
      console.log(this.dataDurableCount.count.countDurable - this.dataDurableCount.count.countCheckDurable, this.dataDurableCount.count.countCheckDurable);
      this.chartPie = new Chart("canvas2", {
        type: "doughnut",
        data: {
          labels: ["สำรวจแล้ว", "ยังไม่สำรวจ"],
          datasets: [
            {
              //มีทั้งหมด 2000 ชิ้น สำรวจแล้ว 500 ชิ้น เหลือที่ไม่สำรวจ 1500 จำนวน ทั้งหมดของ ครุภัณณ์ ลบด้วย จำนวนที่สำรวจทั้งหมด (2000 - 500(ค่าตรงนี้จะเปลี่ยนเสมอ) = 1500(เปลี่ยนตาม))
              data: [this.dataDurableCount.count.countCheckDurable, this.dataDurableCount.count.countDurable - this.dataDurableCount.count.countCheckDurable],
              backgroundColor: [
                "rgba(194, 24, 91, 0.7)",
                "rgba(176, 190, 197, 0.7)",
              ],
              borderColor: [
                "rgba(194, 24, 91, 1)",
                "rgba(176, 190, 197, 1)",
              ],
              borderWidth: 1,
            }
          ]
        },
        options: {
          responsive: false,
          color: "#ffffff",
          plugins: {
            datalabels: {
              color: '#ffffff',
              font: {
                weight: 'bold',
                size: 20,
                family: "'Kanit', sans-serif"
              },
              offset: 8,
              padding: 6,
            },
            legend: {
              position: 'top',
              labels: {
                color: "#ffffff",
                // This more specific font property overrides the global property
                font: {
                  size: 15,
                  family: "'Kanit', sans-serif"
                }
              }
            }
          }
        }
      });
    }
    );
    // barChart2
    this.reportDurableService.getDurableUsers(this.token, this.year).subscribe(res => {

      this.dataResult = [];
      this.labelDataUsername = [];
      this.countStatus = [];
      this.countDurable = [];
      this.leftDurable = [];
      this.dataResult = res.countData;

      this.dataResult.map((value: any) => {
        this.labelDataUsername.push(value.name);
        this.countStatus.push(value.countStatus);
        this.countDurable.push(value.countDurable);
        this.leftDurable.push(value.leftDurable);
      })
    
      this.chart2 = new Chart("canvas3", {
        type: "bar",
        data: {
          labels: this.labelDataUsername,
          datasets: [
            {
              label: "สำรวจแล้ว",
              data: this.countStatus,
              backgroundColor: [
                "rgba(194, 24, 91, 0.7)",
              ],
            },
            {
              label: "มีทั้งหมด",
              data: this.countDurable,
              backgroundColor: [
                "rgba(244, 67, 54, 0.7)",
              ],
            },
            {
              label: "ยังไม่ได้สำรวจ",
              data: this.leftDurable,
              backgroundColor: [
                "rgba(176, 190, 197, 0.7)",
              ],
            }
          ],
        },
        options: {
          // responsive: false,
          scales: {
            xAxis: {
              ticks: {
                color: "#ffffff",
                font: {
                  family: "'Kanit', sans-serif"
                },
              }
            },
            yAxis: {
              ticks: {
                color: "#ffffff",
                font: {
                  family: "'Kanit', sans-serif"
                },
              }
            }
          },
          indexAxis: 'y',
          color: "#ffffff",
          plugins: {
            datalabels: {
              color: '#ffffff',
              align: 'end',
              anchor: 'end',
              font: {
                weight: 'bold',
                family: "'Kanit', sans-serif"
              },
              offset: 8,
              padding: 6,
            },
            legend: {
              labels: {
                color: "#ffffff",
                // This more specific font property overrides the global property
                font: {
                  size: 15,
                  family: "'Kanit', sans-serif"
                }
              }
            }
          }
        }
      }
      );
    });

    while (1940 <= Number(this.yearNow)) {
      this.yearArray.push(this.yearNow);
      this.yearNow--;
    }
  }

  onYearChange(event: any) {
    this.year = event.value;
    this.chartPie.destroy();
    this.chart.destroy();
    this.chart2.destroy();
    this.ngOnInit();
  }

  onRefresh() {
    this.chartPie.destroy();
    this.chart.destroy();
    this.chart2.destroy();
    this.ngOnInit();
  }

}


