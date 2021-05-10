import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServicesService {

  constructor(private http: HttpClient) { }

  getProfiles(params) {
    let url = "/ptrm/api/user-profiles";
    return this.http.get<any[]>(url, { params: params });
  }

  deleteUser(user) {
    let url = "/ptrm/api/delete-user";
    return this.http.post<any>(url, user);
  }

  updateUser(user) {
    let url = "/ptrm/api/update-user";
    return this.http.post<any>(url, user);
  }

  uploadImage(img) {
    let url = "/ptrm/api/upload";
    return this.http.post<any>(url, img);
  }

  getImage(image) {
    let url = "/ptrm/api/download";
    return this.http.get(url, { params: { image: image }, responseType: 'blob'})
  }

  bus() {
    let url = "/ptrm/api/bus";
    return this.http.get<any>(url);
  }

  plcs(range) {
    let url = "/ptrm/api/plcs";
    return this.http.get<any>(url, { params: { range: range } });
  }
  machines_details(range) {
    let url = "/ptrm/api/machinedetails";
    return this.http.get<any>(url, { params: { range: range } });
  }
  machines_values(range) {
    let url = "/ptrm/api/machinevalues";
    return this.http.get<any>(url, { params: { range: range } });
  }

  all_utilization(params) {
    let url = "/ptrm/api/utilization";
    return this.http.get<any>(url, { params: params });
  }

  buUtilization(params) {
    let url = "/ptrm/api/bu-utilization";
    return this.http.get<any[]>(url, { params: params });
  }

  buAvgUtilization(range) {
    let url = "/ptrm/api/bu-avg-utilization";
    return this.http.get<any[]>(url, { params: { range: range } });
  }

  buUtilizationPast(params) {
    let url = "/ptrm/api/bu-past-utilization";
    return this.http.get<any[]>(url, { params: params });
  }

  assetUtilizationPast(params) {
    let url = "/ptrm/api/asset-past-utilization";
    return this.http.get<any[]>(url, { params: params });
  }

  machineStatus(range) {
    let url = "/ptrm/api/machine-status";
    return this.http.get<any[]>(url, { params: { range: range } });
  }

  machineStatusPercent(params) {
    let url = "/ptrm/api/machine-status-percent";
    return this.http.get<any[]>(url, { params: params });
  }

  BUStatusPercent(params) {
    let url = "/ptrm/api/bu-status-percent";
    return this.http.get<any[]>(url, { params: params });
  }

  test_rig(cell, plc, machine) {
    let url = "/ptrm/api/machinedetails/" + cell + '/' + plc + '/' + machine;
    return this.http.get<any>(url);
  }
  test_rig_values(cell, plc, machine) {
    let url = "/ptrm/api/machinevalues/" + cell + '/' + plc + '/' + machine;
    return this.http.get<any>(url);
  }


  utilization_all() {
    let url = "/ptrm/api/utilization";
    return this.http.get<any>(url);
  }
  util_machine(cell, plc, machine) {
    let url = "/ptrm/api/utilization/" + cell + '/' + plc + '/' + machine;
    return this.http.get<any>(url);
  }

  getReport(date): Observable<string> {
    const requestOptions: Object = {
      responseType: 'text',
      params: { date: date }
    }
    let url = "/ptrm/api/report";
    return this.http.get<string>(url, requestOptions);
  }

}
