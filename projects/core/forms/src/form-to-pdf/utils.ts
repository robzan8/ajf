/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
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

import {AjfContext} from '@ajf/core/models';

import {AjfChoice} from '../interface/choices/choice';

// ChoicesMap maps a choicesOriginRef to the list the choices.
export interface ChoicesMap {
  [name: string]: AjfChoice<any>[];
}

export function stripHTML(s: string): string {
  return s.replace(/<\/?[^>]+(>|$)/g, '');
}

// Given a context, lookupStringFunction returns a function that allows to retrieve
// the field values from the context. The values are returned as print-friendly strings.
// rep is the index of the repeating slide, if the field belongs to one.
// emptyValue is returned when the field has no value (defaults to '').
export function lookupStringFunction(
  context?: AjfContext,
  rep?: number,
  emptyValue = '',
): (name: string) => string {
  if (context == null) {
    return (_: string) => emptyValue;
  }
  return (name: string) => {
    if (name == null) {
      return emptyValue;
    }
    if (rep != null) {
      name = name + '__' + rep;
    }
    const val = context[name];
    if (val == null) {
      return emptyValue;
    }
    if (val === true) {
      return 'yes';
    }
    if (val === false) {
      return 'no';
    }
    return String(val);
  };
}

// Analogous to lookupStringFunction, but for multiple-choice questions,
// returning an array of values.
export function lookupArrayFunction(context?: AjfContext, rep?: number): (name: string) => string[] {
  if (context == null) {
    return (_: string) => [];
  }
  return (name: string) => {
    if (name == null) {
      return [];
    }
    if (rep != null) {
      name = name + '__' + rep;
    }
    const val = context[name];
    if (Array.isArray(val)) {
      return val;
    }
    return [];
  };
}
