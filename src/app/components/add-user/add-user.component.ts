import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  private token: any;
  public decoded: any;
  public result: any;
  public user: any = {
    user_id: '',
    name: '',
    password: '',
    gender: '',
    role: ''
  }

  constructor(
    private cookieService: CookieService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.token = this.cookieService.get('Token_App_Durable');
  }

  onSubmit() 
  {
    // console.log(this.user);
    this.userService.addUser(this.user, this.token).subscribe(res => {
      // console.log(res);
      try {
        let errorCode = res.status.code;
        // console.log(errorCode);
        if (errorCode === 401) {
          Swal.fire({
            title: 'รหัสพนักงานนี้มีแล้ว',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          })
        } else {
          Swal.fire({
            title: 'เพิ่มรายชื่อสำเร็จ',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          })
        }
      } catch (error) {
        console.log(error)
      }
    })
  }
}
