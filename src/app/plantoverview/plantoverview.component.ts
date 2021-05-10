import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { element } from 'protractor';


@Component({
  selector: 'app-plantoverview',
  templateUrl: './plantoverview.component.html',
  styleUrls: ['./plantoverview.component.css']
})
export class PlantoverviewComponent implements OnInit {
  displayedColumns: string[] = ['bus_unit', 'yester_util', 'today_util', 'run_idle', 'link'];

  search = '';
  b_units = [];
  thresholdConfig = {
    '0': { color: 'red' },
    '25': { color: 'orange' },
    '75': { color: 'green' }
  };
  y_uts = {}
  t_uts = {}
  sts = {}
  date_1: Date;
  date_2: Date;
  max_date1: Date;
  max_date2: Date;

  curr_b_units = [];

  constructor(private cs: ServicesService) { }

  ngOnInit() {
    this.date_1 = new Date(new Date().setHours(0, 0, 0, 0));
    this.date_2 = new Date();
    this.max_date1 = new Date(new Date().setHours(0, 0, 0, 0));
    this.max_date2 = new Date(new Date().setHours(0, 0, 0, 0));
    this.cs.bus().subscribe(data => {
      this.b_units = data
    })

    let date1 = new Date(new Date(this.date_1).setHours(-24, 0, 0, 0));
    let date2 = new Date(new Date(this.date_1).setHours(-1, 59, 59, 0));
    this.cs.buUtilizationPast({ from: date1.toISOString(), to: date2.toISOString() })
      .subscribe(data => {
        let utils = {}
        for (let util of data) { utils[util._id] = util.utilization; }
        for (let i = 0; i < this.b_units.length; i++) { this.b_units[i]['y_util'] = utils[this.b_units[i]._id] || 0; }
      })

    this.cs.all_utilization({ from: this.date_1.toISOString(), to: this.date_2.toISOString() }).subscribe(data => {
      let utils = {}
      for (let util of data) {
        utils[util._id] = util.utilization;
      }
      for (let i = 0; i < this.b_units.length; i++) {
        this.b_units[i]['t_util'] = (utils[this.b_units[i]._id] || 0) / this.b_units[i].machine_count;
        this.b_units[i]['t_util'] = this.b_units[i]['t_util'] > 100 ? 100 : this.b_units[i]['t_util'];

        this.b_units[i]['run'] = (utils[this.b_units[i]._id] || 0) / this.b_units[i].machine_count;
        this.b_units[i]['run'] = this.b_units[i]['run'] > 100 ? 100 : this.b_units[i]['run'];
      }
    })
  }

  getStatusPercent() {
    if (this.date_2.getDate() == new Date().getDate()) {
      this.date_2 = new Date()
      this.cs.all_utilization({ from: this.date_1.toISOString(), to: this.date_2.toISOString() })
        .subscribe(data => {
          let utils = {}
          for (let util of data) {
            utils[util._id] = util.utilization;
          }
          for (let i = 0; i < this.b_units.length; i++) {
            this.b_units[i]['run'] = (utils[this.b_units[i]._id] || 0) / this.b_units[i].machine_count;
            this.b_units[i]['run'] = this.b_units[i]['run'] > 100 ? 100 : this.b_units[i]['run'];
          }
        })
    }
    else {
      this.date_2 = new Date(this.date_2.setHours(23, 59, 59, 0))
      this.cs.buUtilizationPast({ from: this.date_1.toISOString(), to: this.date_2.toISOString() })
        .subscribe(data => {
          let utils = {}
          for (let util of data) { utils[util._id] = util.utilization; }
          for (let i = 0; i < this.b_units.length; i++) { this.b_units[i]['run'] = utils[this.b_units[i]._id] || 0; }
        })
    }
  }

  searchid() {
    this.curr_b_units = this.b_units.filter(element => (element.name.toUpperCase().search(this.search.toUpperCase()) != -1));
  }

  onDateSelect() {
    if (+this.date_1 == +new Date(new Date().setHours(0, 0, 0, 0))) {
      this.max_date2 = new Date(new Date().setHours(0, 0, 0, 0));
    }
    else {
      this.max_date2 = new Date(new Date().setHours(-24, 0, 0, 0));
      this.date_2 = null
    }
  }

}




