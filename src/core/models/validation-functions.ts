/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {addDays, addMonths, addYears, format, parse, startOfMonth} from 'date-fns';
import * as numeral from 'numeral';

export const dateUtils = {addDays, addMonths, addYears, format, parse, startOfMonth};

const numeralConstructor: (value?: any) => any = (<any>numeral).default || numeral;


export function digitCount(x: number): number {
  if (x == null) { return 0; }
  return x.toString().length;
}

export function decimalCount(x: string|number): number {
  if (x == null) { return 0; }
  if (typeof x === 'string') {
    x = parseFloat(x);
  }
  if (isNaN(x)) {
    return 0;
  }
  const parts = x.toString().split('.');
  return parts.length > 1 ? parts[1].length : 0;
}

export function isInt(x: string): boolean {
  return !/[,.]/.test(x);
}

export function notEmpty(x: any): boolean {
  return (typeof x !== 'undefined' && x !== null ? x.toString().length > 0 : false);
}

export function valueInChoice(array: any[], x: any): boolean {
  return (array || []).indexOf(x) > -1 || array === x;
}

export function scanGroupField(reps: number, acc: any, callback: any): any {
  for (let i = 0; i < reps; i++) {
      acc = callback(acc, i);
  }
  return acc;
}

export function sum(array: any[]): any {
  return array.reduce((a, b) => a + b, 0);
}

export function dateOperations(
  dString: string, period: string, operation: string, v: any
): string {
  const fmt = 'MM/DD/YYYY';
  let d = (typeof dString !== 'undefined') ? dateUtils.parse(dString) : new Date();
  if (operation == 'remove') {
    v = -v;
  }
  let dateOp;
  switch (period) {
    case 'day':
      dateOp = dateUtils.addDays;
      break;
    case 'month':
      dateOp = dateUtils.addMonths;
      break;
    case 'year':
      dateOp = dateUtils.addYears;
      break;
    default:
      return '';
  }
  return dateUtils.format(dateOp(d, v), fmt);
}

export function round(num: number|string, digits: number): number {
  digits = digits || 0;
  let f;
  if (typeof num !== 'number') {
    try {
      f = parseFloat(num);
    } catch (e) { }
  } else {
    f = num;
  }
  if (f == null || isNaN(f)) {
    f = 0;
  }
  const m = Math.pow(10, digits);
  return Math.round(f * m) / m;
}

export function extractArray(source: any[], property: string, property2?: string): any[] {
  source = (source || []).slice(0);
  const l = source.length;
  const res: any[] = [];
  for (let i = 0; i < l ; i++) {
    if (source[i][property] != null && property2 != null && source[i][property2] != null) {
      res.push(source[i][property] + source[i][property2]);
    } else if (source[i][property] != null) {
      res.push(source[i][property]);
    }
  }
  return res;
}

export function extractSum(source: any[], properties: string[]): number {
  let sumVal = 0;
  properties = (properties || []).slice(0);
  const l = properties.length;

  for (let i = 0; i < l ; i++) {
    const array = extractArray(source, properties[i]);
    const leng = array.length;
    for (let j = 0; j < leng; i++) {
      sumVal += array[j];
    }
  }
  return sumVal;
}

export function extractArraySum(source: any[], properties: string[]): any[] {
  const arrays: any[] = [];
  properties = (properties || []).slice(0);

  for (let i = 0; i < properties.length ; i++) {
    const array = extractArray(source, properties[i]);
    arrays.push(array);
  }

  const res: any[] = [];
  if (arrays.length > 0) {
    for (let weekI = 0; weekI < arrays[0].length; weekI ++ ) {
      let sumVal = 0;
      for (let propI = 0; propI < properties.length ; propI++) {
        sumVal = sumVal + arrays[propI][weekI];
      }
      res.push(sumVal);
    }
  }
  return res;
}

export function drawThreshold(source: any[], property: string, treshold: any[]): any[] {
  source = (source || []).slice(0);
  treshold = treshold || [0];
  if (!(treshold instanceof Array)) {
    treshold = [treshold];
  }
  const l = source.length;
  const res: any[] = [];
  let count = 0;
  for (let i = 0; i < l ; i++) {
    if (source[i][property] != null) {
      if (treshold.length > count) {
        res.push(treshold[count]);
      } else {
        res.push(treshold[0]);
      }
      count++;
    }
  }
  return res;
}

export function extractDates(source: any[], property: string, fmt: string): string[] {
  source = (source || []).slice(0);
  const l = source.length;
  const res: any = [];
  let prefix = '';
  for (let i = 0; i < l ; i++) {
    if (source[i][property] != null) {
      switch (fmt) {
        case 'WW':
          prefix = 'W';
          break;
        case 'MM':
          prefix = 'M';
          break;
        default:
          prefix = '';
      }
      res.push(prefix + formatDate(source[i]['date_start'], fmt));
    }
  }
  return res;
}

export function lastProperty(source: any, property: string): any {
  source = (source || []).slice(0);
  let l = source.length - 1;

  while (l >= 0 && source[l][property] == null) {
    l--;
    if (l < 0) { return ''; }
  }
  return l >= 0 ? source[l][property] : '';
}

export function sumLastProperties(source: any[], properties: string[]): number {
  source = (source || []).slice(0);
  let sumVal = 0;
  for (let i = 0; i < properties.length; i++) {
    sumVal += lastProperty(source, properties[i]);
  }

  return sumVal;
}

export function calculateTrendProperty(source: any[], property: string): string {
  source = (source || []).slice(0);
  let last = source.length - 1;
  while (source[last][property] == null) {
    if (last == 0) {
      break;
    }
    last--;
  }
  let lastLast = last - 1;
  if (last == 0) {
    lastLast = last;
  } else {
    while (source[lastLast][property] == null) {
      if (lastLast == 0) {
        lastLast = last;
        break;
      }
      lastLast--;
    }
  }

  const lastProp = source[last] ? (source[last][property] || 0) : 0;
  const lastLastProp = source[lastLast] ? (source[lastLast][property] || 0) : 0;

  if (lastProp == lastLastProp) {
    return '<p><i class="material-icons" style="color:blue">trending_flat</i></p>';
  } else if (lastProp > lastLastProp) {
    return '<p><i class="material-icons" style="color:green">trending_up</i></p>';
  } else {
    return '<p><i class="material-icons" style="color:red">trending_down</i></p>';
  }
}

export function calculateTrendByProperties(source: any[], properties: string[]): string {
  const arraysum = extractArraySum(source, properties);

  const lastProp =  arraysum.length > 0 ? (arraysum[arraysum.length -1] || 0) : 0;
  const lastLastProp = arraysum.length > 1 ? (arraysum[arraysum.length -2] || 0) : lastProp;

  if (lastProp == lastLastProp) {
    return '<p><i class="material-icons" style="color:blue">trending_flat</i></p>';
  } else if (lastProp > lastLastProp) {
    return '<p><i class="material-icons" style="color:green">trending_up</i></p>';
  } else {
    return '<p><i class="material-icons" style="color:red">trending_down</i></p>';
  }
}

export function calculateAvgProperty(
  source: any[], property: string, range: number, coefficient: number
): number {
  source = (source || []).slice(0);

  coefficient = coefficient || 1;
  range = range || 12;

  let l = source.length;
  let res = 0;
  let counter = 0;
  let noZero = 0;

  if (l < range) {
    range = l;
  }

  while (range != 0) {
    if (source[l - 1][property] != null) {
      counter++;
      res += source[l - 1][property];

      if (source[l - 1][property] > 0) {
        noZero++;
      }
    }
    l--;
    range--;
  }

  if (coefficient == 0) {
    return noZero;
  } else {
    return round((res / counter) * coefficient, 2) || 0;
  }
}

export function calculateAvgPropertyArray(
  source: any[], properties: string[], range: number, coefficient: number
): number[] {
  source = (source || []).slice(0);
  const resArr: any[] = [];

  if (properties && properties.length > 0) {
    let avg = 0;

    coefficient = coefficient || 1;
    range = range || 12;

    const sourceArr = properties.length > 1 ? extractArraySum(source, properties) : extractArray(source, properties[0]);

    let l = sourceArr.length;

    for (let len = l; len > 0 ; len--) {
      let res = 0;
      let counter = 0;
      let noZero = 0;

      if (len < range) {
        range = len;
      }

      for (let r = 1; r <= range ; r++) {
        let val = sourceArr[len - r];
        if (val != null) {
          counter++;
          res += val;
          if (val > 0) {
            noZero++;
          }
        }
      }

      if (counter > 0) {
        if (coefficient == 0) {
          avg = noZero;
        } else {
          avg = (res / counter) * coefficient || 0;
        }
        resArr.push(round(avg, 2));
      }
    }
  }
  return resArr.reverse();
}

export function alert(source: any[], property: string, treshold: number): string {
  source = (source || []).slice(0);

  if ( lastProperty(source, property)  > treshold ) {
    return '<p><i class="material-icons" style="color:red">warning</i></p>';
    } else {
      return '<p></p>';
    }
}

export function formatNumber(num: number, fmt?: string): string {
  fmt = fmt || '0,0[.]0';
  return numeralConstructor(num).format(fmt);
}

export function formatDate(date: Date, fmt?: string): string {
  fmt = fmt || 'MM-DD-YYYY';
  return dateUtils.format(date, fmt);
}

export function isoMonth(date: Date, fmt?: string): string {
  fmt = fmt || 'MM';
  const du = dateUtils;
  return du.format(du.addDays(du.startOfMonth(date), 4), fmt);
}

export function getCoordinate(source: any, zoom?: number): [number, number, number] {
  zoom = zoom || 6;
  if (source == null) {
    return [51.505, -0.09, zoom];
  } else {
    return [source[0], source[1], zoom];
  }
}
