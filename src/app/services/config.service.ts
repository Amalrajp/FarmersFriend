import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  getBUs() {
    let url = "/ptrm/api/bus";
    return this.http.get<any>(url);
  }

  createBU(bu) {
    let url = "/ptrm/api/create-bu";
    return this.http.post<any>(url, bu);
  }

  deleteBU(bu) {
    console.log(bu)
    let url = "/ptrm/api/delete-bu";
    return this.http.post<any>(url, bu);
  }

  updateBU(bu) {
    let url = "/ptrm/api/update-bu";
    return this.http.post<any>(url, bu);
  }

  getPLCs(range) {
    let url = "/ptrm/api/plcs";
    return this.http.get<any>(url, { params: { range: range } });
  }

  updatePLC(plc) {
    let url = "/ptrm/api/update-plc";
    return this.http.post<any>(url, plc);
  }

  getRoles() {
    let url = "/ptrm/api/roles";
    return this.http.get<any[]>(url);
  }

  updateRole(role) {
    let url = "/ptrm/api/update-role";
    return this.http.post<any>(url, role);
  }

  getProfiles() {
    let url = "/ptrm/api/profiles";
    return this.http.get<any[]>(url);
  }

  updateProfile(profile) {
    let url = "/ptrm/api/update-profile";
    return this.http.post<any>(url, profile);
  }

  insertUtil(data) {
    let url = "/ptrm/api/insert-utilization/";
    return this.http.post<any>(url, data);
  }

  isConflict(bus) {
    let range = {}
    for (const bu of bus) {
      let numbers = this.rangeToNumbers(bu.range)
      for (const number of numbers) {
        if (range[number]) return true
        range[number] = true
      }
    }
    return false
  }

  rangeToNumbers = function (rangeString) {
    let numbers = []
    if (!rangeString) return []
    for (let i of rangeString.split(',')) {
      let x
      if (i.indexOf('-') == -1) x = [Number(i)]
      else x = this.range(Number(i.split('-')[0]), Number(i.split('-')[1]))
      numbers = [...numbers, ...x]
    }
    return numbers
  }

  range(start, end) {
    var arr = [], c = end - start + 1;
    while (c--) { arr[c] = end-- }
    return arr
  }


}
