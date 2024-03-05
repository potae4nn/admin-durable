import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { VerifyUserService } from '../../services/verify-user.service';
import { UsersService } from '../../services/users.service';
import { DurableService, IDurable } from '../../services/durable.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-add-durable',
  templateUrl: './add-durable.component.html',
  styleUrls: ['./add-durable.component.css']
})


export class AddDurableComponent implements OnInit {
  public users: any = [];
  private token: any;
  public decoded: any;
  public result: any;
  public durable: IDurable = {
    building: "",
    fiscal_year: "",
    durable_id: "",
    name: "",
    location: "",
    price: 0,
    user_id: "",
    office:"",	
    serial_no:"",	
    model:"",
  }

  constructor(
    private route: Router,
    private cookieService: CookieService,
    private usersService: UsersService,
    private durableService: DurableService
  ) { }

  ngOnInit(): void {
    this.token = this.cookieService.get('Token_App_Durable');
    this.usersService.getUsers(this.token).subscribe(res => {
      this.users = res.data;
    });
  }

  onSubmit() {
    this.durableService.sendDurable(this.durable, this.token)
    .subscribe(res => {
      // console.log(res);
      let codeError = res.status.code;
      try {
        if (codeError === 401) {
          Swal.fire({
            title: 'มีครุภัณฑ์นี้แล้ว',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          })
        } else {
          Swal.fire({
            title: 'เพิ่มครุภัณฑ์สำเร็จ',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          })
        }
      } catch (error) {
        console.log(error);
      }
    }
    )
  }


}
