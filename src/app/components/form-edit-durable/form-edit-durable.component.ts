import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DurableService, IDurable } from '../../services/durable.service';
// import { VerifyUserService } from '../../services/verify-user.service';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form-edit-durable',
  templateUrl: './form-edit-durable.component.html',
  styleUrls: ['./form-edit-durable.component.css']
})
export class FormEditDurableComponent implements OnInit {
  public durable: IDurable[] = [];
  public users: any = [];
  private token: any;
  public id: any;

  constructor(
    private route: Router,
    private activateRouter: ActivatedRoute,
    private durableService: DurableService,
    private cookieService: CookieService,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.token = this.cookieService.get('Token_App_Durable');
    this.usersService.getUsers(this.token).subscribe(res => {
      this.users = res.data;
    });
    this.id = this.activateRouter.snapshot.paramMap.get('id');

    // console.log(this.id);
    this.durableService.getDurableId(this.id, this.token)
      .subscribe((res) => {
        // console.log(res.data[0]);
        this.durable.push(res.data[0]);
      });
  }

  public deleteDurable(id: any) {
    // console.log(id);
    this.durableService.cancelDurable(id, this.token).subscribe(res => {
      try {
        // console.log(res)
        Swal.fire({
          title: 'ลบการครุภัณฑ์สำเร็จ',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          this.route.navigate(['/reportDurable']);
        });
      } catch (error) {
        console.log(error);
      }
    })
  }

  onSubmit() {
    this.durableService.putDurable(this.durable[0], this.token)
      .subscribe((res) => {
        try {
          Swal.fire({
            title: 'แก้ไขรายการครุภัณฑ์สำเร็จ',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this.route.navigate(['/reportDurable']);
          });
        } catch (error) {
          console.log(error);
        }
      });
  }



  cancelDurable() {
    // console.log('cancel');
    // console.log(this.userData[0].user_id);
    // this.usersService.cancelUser(this.userData[0].user_id, this.token)
    //   .subscribe((res) => {
    //     // console.log(res)
    //     try {
    //       Swal.fire({
    //         title: 'ยกเลิกสมาชิกสำเร็จ',
    //         icon: 'success',
    //         showConfirmButton: false,
    //         timer: 2000
    //       }).then(() => {
    //         this.route.navigate(['/editUser']);
    //       });
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   });
  }


}

