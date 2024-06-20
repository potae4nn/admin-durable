import { OnInit, Pipe, PipeTransform } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';

@Pipe({
  name: 'profile'
})
export class ProfilePipe implements PipeTransform, OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
  transform(item: string): any {
    let name = '';
    let userName;
    userName = localStorage.getItem('User_Name');
    if (userName !== null) {
      name = userName
    } else {
      name = item
    }
    return name.toString();
  }

}
