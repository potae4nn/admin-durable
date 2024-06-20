import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from '../../app.url';

@Injectable({
  providedIn: 'root'
})

export class DurableService {

  constructor(private httpClient: HttpClient) { }

  public sendDurable(data: IDurable, token: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    return this.httpClient.post<any>(`${url}/durable/add`, data, { headers: headers });
  }

  public getDurableId(id: string, token: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    return this.httpClient.get<IDurable>(`${url}/durable/getdurable/${id}`, { headers: headers });
  }

  public putDurable(data: IDurable, token: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    return this.httpClient.post<IDurable>(`${url}/durable/update`, data, { headers: headers });
  }

  public cancelDurable(id: number, token: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    return this.httpClient.post<any>(`${url}/durable/cancel`, { 'id': id }, { headers: headers });
  }

  public search(result: any, token: string, year: string | number, status: any[]) {
    let data = { 'year': year.toString(), 'status': status, 'search': result };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    return this.httpClient.post<any>(`${url}/durable/search`, data, { headers: headers });
  }

  public updateAndCheck(id_durable: number, check_status: string, token: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    return this.httpClient.post<any>(`${url}/durable/updateandcheck`, { id_durable, check_status }, { headers: headers });
  }
}

export interface IDurable {
  data?: any;
  building: string;
  fiscal_year: string;
  durable_id: string;
  name: string;
  location: string;
  price: number;
  user_id: string;
  id?: number;
  office: string;
  serial_no: string;
  model: string;
  remark?: string;
}
