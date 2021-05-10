import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  menu_items = [
    { route: ['/homepage/plant/'], label: "Home" },
    { route: ['/homepage/dashboard/'], label: "Dashboard" },
    { route: ['/homepage/user-management/'], label: "User Management" },
  ]

  constructor() { }

  ngOnInit() {
    let pages = localStorage.getItem('paths').split(',');
    this.menu_items = this.menu_items.filter(item => pages.includes(item.route[0].split('/')[2]))
    this.menu_items.push({ route: ['/homepage/report/'], label: "Report" })
  }

  logout() {
    localStorage.removeItem('token');
  }

}
