import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {

  public form = {
    username: '',
    password: ''
  }

  constructor(
    public usersService: UsersService,
    private route: Router,
    private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  public loginUser() {
    this.usersService.userLogin(this.form)
    .subscribe(async res => {
      try {
        if (res.users.status === "1" && res.users.role === "1") {
          await this.cookieService.set("Token_App_Durable", res.token);
          await this.cookieService.set("User_Id", res.users.user_id);
          await localStorage.setItem("User_Name", res.users.name);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'เข้าสู่ระบบสำเร็จ',
            showConfirmButton: false,
            timer: 2500
          }).then(() => {
            this.route.navigate(['/deshboard']);
          }
          );
        } else {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'ไม่มีสิทธ์ในการเข้าถึง',
            showConfirmButton: false,
            timer: 2500
          })
        }
      } catch (e) {
        // console.log(e);
        if(res.status.code == 401){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'รหัสสมาชิกหรือรหัสผ่านไม่ถูกต้อง',
            showConfirmButton: false,
            timer: 2500
          })
        }
        // alert("รหัสสมาชิกหรือรหัสผ่านไม่ถูกต้อง");
      }
    });
  }


}
