import { Injectable } from '@angular/core';
import { url } from '../../app.url';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url: string = `${url}/auth/login`;
  private urlUsers: string = `${url}/users`;
  private urlUserId: string = `${url}/users/getUser`;
  private urlPutUser: string = `${url}/users/putUser`;
  private urlResetPassword: string = `${url}/users/resetPasswordUser`;
  private urlCancelUser: string = `${url}/users/cancelUser`;

  constructor(
    private httpClient: HttpClient
  ) { }

  public value: any;

  public userLogin(data: any) {
    return this.httpClient.post<any>(`${url}/auth/login`, data);
  }

  public addUser(data: any, token: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    return this.httpClient.post<any>(`${url}/user/add`, data, { headers: headers });
  }

  public getUsers(token: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    return this.httpClient.get<any>(`${url}/user`, { headers: headers });
  }

  public getUserId(id: string, token: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    return this.httpClient.get<any>(`${url}/user/${id}`, { headers: headers });
  }

  public putUser(data: any, token: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    return this.httpClient.post<any>(`${url}/user/update`, data, { headers: headers });
  }

  public resetPasswordUser(user_id: string, token: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    return this.httpClient.post<any>(`${url}/user/resetpassword`, { 'user_id': user_id }, { headers: headers });
  }

  public cancelUser(user_id: any, token: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    return this.httpClient.post<any>(`${url}/user/remove`, { 'user_id': user_id }, { headers: headers });
  }
}

export interface IUsers {
  data: any;
  id?: string;
  user_id: string;
  role: string;
  gender: number;
  name: string;
  password: string;
  image: string;
}