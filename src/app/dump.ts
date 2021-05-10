// date_calc() {
//     if (this.index === 2) {
//       this.machines = this.machines.map(elem => {
//         let h = elem.plc_id + 'X' + elem.machine_id
//         if (this.details[elem.plc_id + 'Xundefined'].plc_status == 0 || this.details[h].status == 0) {
//           elem['run_status'] = false;
//         }
//         else {
//           elem['run_status'] = true;
//           if (this.details[h] && this.details[h].timestamp !== undefined) {
//             let d = new Date(this.details[h].timestamp);
//             let soc = ((this.details[h].target_cycles - this.details[h].actual_cycles)) / this.details[h].cpm
//             soc = Math.round(soc)
//             d.setMinutes(d.getMinutes() + soc)
//             elem['doc'] = d
//           }
//         }
//         return elem
//       })
//     }
//     else this.index++;
//   }
