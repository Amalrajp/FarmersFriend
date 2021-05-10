import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `<h1  style="text-align:center">Page not found</h1>
  <p style="text-align:center">We're sorry, we couldn't find the page you requested.</p>`,
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
