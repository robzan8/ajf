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

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'ajfChoicesMap'})
export class AjfChoicesMapPipe implements PipeTransform {
  transform(value: {label: string, value: string}[])
      : {array: string[], map: {[value: string]: string}} {
    if (value == null || value.length === 0) { return {array: [], map: {}}; }
    const choicesMap = value.reduce((p, c) => {
      p[c.value] = c.label;
      return p;
    }, {} as {[value: string]: string});
    const choicesArr = Object.keys(choicesMap);
    return {array: choicesArr, map: choicesMap};
  }
}
