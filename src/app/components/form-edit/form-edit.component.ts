import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService, IUsers } from '../../services/users.service';
import { VerifyUserService } from '../../services/verify-user.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url, apiKey } from '../../../app.url';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent implements OnInit {
  public userData: IUsers[] = []
  private token: any;
  public id: any;
  // private test: string = `${url}/api/users/test`;
  
  constructor(
    private route: Router,
    private activateRouter: ActivatedRoute,
    private usersService: UsersService,
    private cookieService: CookieService,
    // private verifyUserService: VerifyUserService,
    // private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.token = this.cookieService.get('Token_App_Durable');
    this.id = this.activateRouter.snapshot.paramMap.get('id');

    // console.log(this.id);
    this.usersService.getUserId(this.id, this.token).subscribe((res) => {
      // console.log(res);
      this.userData.push(res.data[0]);
    });
  }

  onSubmit() {
    // console.log(this.userData[0]);
    this.usersService.putUser(this.userData[0], this.token).subscribe(() => {
      try {
        Swal.fire({
          title: 'แก้ไขข้อมูลสำเร็จ',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          this.route.navigate(['/editUser']);
        });
      } catch (error) {
        console.log(error);
      }
    });
  }


  onResetPassword() {
    // console.log(this.userData[0].id);
    this.usersService.resetPasswordUser(this.userData[0].user_id, this.token).subscribe((res) => {
      // console.log(res);
      try {
        Swal.fire({
          title: 'รีเซ็ทรหัสผ่านสำเร็จ',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          this.route.navigate(['/editUser']);
        });
      } catch (error) {
        console.log(error);
      }
    });
  }

  cancelUser() {
    // console.log('cancel');
    // console.log(this.userData[0].user_id);
    this.usersService.cancelUser(this.userData[0].user_id, this.token)
      .subscribe((res) => {
        // console.log(res)
        try {
          Swal.fire({
            title: 'ยกเลิกสมาชิกสำเร็จ',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this.route.navigate(['/editUser']);
          });
        } catch (error) {
          console.log(error);
        }
      });
  }


}