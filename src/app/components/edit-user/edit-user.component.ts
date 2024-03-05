import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsersService, IUsers } from '../../services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  private token: any;
  public decoded: any;
  public result: any;
  public limitpage: number = 10;
  public startpage: number = 1;
  public paginations: number[] = [];
  public searchUsers: string = '';
  public userData: any[] = [];
  public p: number = 1;
  public start: any;
  public last: any;
  public previousLabel: string = "ย้อนกลับ";
  public nextLabel: string = "ถัดไป";

  constructor(
    private route: Router,
    private cookieService: CookieService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.token = this.cookieService.get('Token_App_Durable');
    this.usersService.getUsers(this.token)
      .subscribe((response: any) => {
        // console.log(response);
        this.userData = response.data;
        this.initializeLoadPagination();
      });
  }

  onToFormEdit(item: any) {
    this.route.navigate(['/formEdit', item.id]);
  }

  onSearchUsers(event: string) {
    if (event) {
      const newData = this.userData.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = event.toUpperCase();
        return itemData.indexOf(textData) > -1
      });
      this.userData = newData;
      this.searchUsers = event;
    } else {
      this.searchUsers = event;
      this.ngOnInit();
    }
  }

  onLimitPageChange(event: any) {
    this.limitpage = event.target.value;
    this.initializeLoadPagination();
  }

  public getPaginItem(item: any) {
    return item.slice((this.startpage - 1) * this.limitpage, this.startpage * this.limitpage);
  }

  public listCount(count: number) {
    this.start = count
    this.start = this.start * this.limitpage - (this.limitpage - 1)
    this.last = count * this.limitpage
    if (this.last > this.userData.length) {
      this.last = this.userData.length;
    }
  }

  // คำนวนหน้า page
  public initializeLoadPagination() {
    const pageLength = Math.ceil(this.userData.length / this.limitpage);
    this.paginations = [];
    for (let index = 1; index <= pageLength; index++) {
      this.paginations.push(index);
    }
  }


  public prevPage() {
    if (this.startpage <= 1) return;
    this.startpage = this.startpage - 1
  }

  public nextPage() {
    if (this.startpage >= this.paginations.length) return;
    this.startpage = this.startpage + 1
  }

}

