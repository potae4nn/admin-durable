import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private route: Router
  ) { }

   async ngOnInit(): Promise<void> {
    await this.cookieService.delete('Token_App_Durable');
    await this.cookieService.delete('User_Id');
    await localStorage.removeItem('User_Name_Durable');
    await this.route.navigate(['/signin']);
  }

}
