import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from '../../app.url';

@Injectable({
  providedIn: 'root'
})
export class ReportDurableService {

  constructor(private httpClient: HttpClient) { }

  public getDurableReport(token: string, year: string | number, status: any[]) {
    let data = { 'year': year.toString(), 'status': status };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    return this.httpClient.post<any[]>(`${url}/durable/totaldurable`, data, { headers: headers });
  }

  public getDurableReject(token: string, year: string | number) {
    console.log(year)
    let data = { 'year': year.toString() };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    return this.httpClient.get(`${url}/durable/reject/${year}`, { headers: headers });
  }

  public getDurableChart(token: string, year: string | number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    return this.httpClient.get<ICount>(`${url}/durable/durablepiechart/${year.toString()}`, { headers: headers });
  }

  public getDurableStatusCount(token: string, year: string | number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    return this.httpClient.get<any>(`${url}/durable/countdurable/${year.toString()}`, { headers: headers });
  }

  public getDurableUsers(token: string, year: string | number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8', 'Authorization': 'Bearer ' + token });
    return this.httpClient.get<any>(`${url}/durable/durablechartusers/${year.toString()}`, { headers: headers });
  }
}

export interface IDurable {
  _id: string;
  user_id: string;
  status: string;
  gender: number;
  name: string;
  password: string;
  usersDurable: Array<IUsersDurable>;
}
export interface IUsersDurable {
  id_durable: string;
  list: string;
  price: number;
  location: string;
  building: string;
  fiscal_year: number;
}

export interface ICount {
  countDurable: number;
  countCheckDurable: number;
}