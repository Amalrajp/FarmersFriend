import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-machineoverview',
  templateUrl: './machineoverview.component.html',
  styleUrls: ['./machineoverview.component.css']
})
export class MachineoverviewComponent implements OnInit {
  displayedColumns: string[] = ['mach_id', 'live_status', 'today_util', 'run_idle'];
  icon = ['../../../assets/ptrm/idle.svg', '../../../assets/ptrm/run.svg']
  details = {};
  todayUtil = {};
  machines = [];
  status;
  dataSource;
  bu;
  cell_id;
  range;
  index = 0;
  date_1: Date;
  date_2: Date;
  max_date1: Date;
  max_date2: Date;

  constructor(private mach: ServicesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.date_1 = new Date(new Date().setHours(0, 0, 0, 0));
    this.date_2 = new Date();
    this.max_date1 = new Date(new Date().setHours(0, 0, 0, 0));
    this.max_date2 = new Date(new Date().setHours(0, 0, 0, 0));
    this.route.params.subscribe(param => {
      let params = param['bu'].split('~');
      this.bu = params[0];
      this.range = params[1];
      this.cell_id = params[2];
    });

    this.mach.plcs(this.range).subscribe(data => {
      let machines = [];
      for (let plc of data) {
        let machine = plc;
        if (plc.m1_enabled) {
          machine.machine_id = plc.m1
          machine.id = "" + machine.plc_id + machine.machine_id
          this.details[machine.id] = {}
          machines.push(Object.assign({}, machine))
        }
        if (plc.m2_enabled) {
          machine.machine_id = plc.m2
          machine.id = "" + machine.plc_id + machine.machine_id
          this.details[machine.id] = {}
          machines.push(Object.assign({}, machine))
        }
      }
      this.dataSource = machines
      this.machines = machines

    })

    this.mach.machineStatus(this.range).subscribe(data => {
      let status = {}
      for (let state of data) {
        let id = "" + state._id.plc_id + state._id.machine_id
        status[id] = state.status
      }
      for (let i = 0; i < this.machines.length; i++) {
        this.machines[i]['sts'] = status[this.machines[i].id] || this.machines[i]['sts'] || false;
      }
    })
    this.mach.buUtilization({ range: this.range, from: this.date_1.toISOString(), to: this.date_2.toISOString() }).subscribe(data => {
      let utils = {}
      for (let util of data) {
        let id = "" + util._id.plc_id + util._id.machine_id
        utils[id] = util.utilization > 100 ? 100 : util.utilization
      }
      for (let i = 0; i < this.machines.length; i++) {
        this.machines[i]['util'] = (utils[this.machines[i].id] || 0);
        this.machines[i]['run'] = (utils[this.machines[i].id] || 0);
        if (this.machines[i]['util'] > 0 && this.machines[i].manual) this.machines[i]['sts'] = true
        this.todayUtil[this.machines[i].id] = this.machines[i]['util']
      }
    })
  }

  getStatusPercent() {
    this.dataSource = [...this.machines]
    if (this.date_2.getDate() == new Date().getDate()) {
      this.date_2 = new Date()
      this.mach.buUtilization({ range: this.range, from: this.date_1.toISOString(), to: this.date_2.toISOString() }).subscribe(data => {
        let utils = {}
        for (let util of data) {
          let id = "" + util._id.plc_id + util._id.machine_id
          utils[id] = util.utilization > 100 ? 100 : util.utilization
        }
        for (let i = 0; i < this.machines.length; i++) {
          this.machines[i]['run'] = (utils[this.machines[i].id] || 0);
        }
      })
    }
    else {

      this.date_2 = new Date(this.date_2.setHours(23, 59, 59, 0))

      this.mach.assetUtilizationPast({ cell: this.cell_id, from: this.date_1.toISOString(), to: this.date_2.toISOString() }).subscribe(data => {
        let index_machines = {};
        for (let i = 0; i < this.dataSource.length; i++) {
          index_machines[this.dataSource[i].id] = i;
          this.dataSource[i].run = null
        }

        for (let util of data[0].machines) {
          let id = "" + util._id.plc_id + util._id.machine_id
          if (index_machines[id] != null) this.dataSource[index_machines[id]]['run'] = util.utilization > 100 ? 100 : util.utilization;
          else {
            let obj = { machine_id: util._id.machine_id, plc_id: util._id.plc_id, run: util.utilization > 100 ? 100 : util.utilization, id: id }
            this.dataSource = [...this.dataSource, obj]
          }
        }
      })
    }


  }

  filter(value) {
    let machines = [];
    let top = 100, bottom = 0;
    if (value == 1) top = 60;
    else if (value == 2) { bottom = 60; top = 85 }
    else if (value == 3) bottom = 85;
    machines = this.machines.filter(element => (element.util >= bottom && element.util <= top))
    this.dataSource = machines
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