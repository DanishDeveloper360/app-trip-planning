import { Injectable } from '@angular/core';
import { IHelper } from './ihelper';

@Injectable()
export class Helper implements IHelper {

  removeItemInArray(array: any, item: any) {
    const index = array.indexOf(item, 0);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  getLowestPrice(queue: any, cost: any) {
    // Lowest cost must be still in queue and has smallest edge weight
    return queue.filter(item => cost[item] >= 0).reduce((previuos, current) => {
      if (previuos === null || cost[current] < cost[previuos]) {
        previuos = current;
      }
      return previuos;
    }, null);
  }

  getPrice(cost: any, discount: any) {
    if (!discount) {
      return cost;
    }
    return cost - ((discount / 100) * cost);
  }

  convertMinutesIntoDuration(hours: any, minutes: any) {
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  }

  convertMinsToHrsMins(mins: any) {
    let h: any = Math.floor(mins / 60);
    let m: any = mins % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return `${h} hours ${m} minutes`;
  }
}
