import { Injectable } from '@angular/core';
import { url } from '../../app.url';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VerifyUserService {
  private url: string = `${url}/auth/verify`;
  constructor(private httpClient: HttpClient) { }

  public verifyToken(token: any) {
    return this.httpClient.get<any>(this.url, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    });
  }
}

export interface IUser {
  id: string;
  user_id: string;
  gender: number;
  name: string;
  status: string;
  iat: number;
  exp: number;
}

