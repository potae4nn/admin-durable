import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { VerifyUserService } from '../../services/verify-user.service';

@Component({
  selector: 'app-edit-durable',
  templateUrl: './edit-durable.component.html',
  styleUrls: ['./edit-durable.component.css']
})
export class EditDurableComponent implements OnInit {

  private token: any;
  public decoded: any;
  public result: any;

  constructor(private route: Router, private cookieService: CookieService, private verifyUserService: VerifyUserService) { }

  ngOnInit(): void {
    this.token = this.cookieService.get('Token_App_Durable');
  }

}
