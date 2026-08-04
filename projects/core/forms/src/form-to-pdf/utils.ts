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

import {AjfFile} from '@ajf/core/file-input';
import {AjfContext} from '@ajf/core/models';

import {AjfChoice} from '../interface/choices/choice';
import {AjfFieldType} from '../interface/fields/field-type';
import {AjfForm} from '../interface/forms/form';
import {AjfRepeatingSlide} from '../interface/slides/repeating-slide';
import {AjfSlide} from '../interface/slides/slide';
import {isField} from '../utils/nodes/is-field';
import {isRepeatingSlide} from '../utils/nodes/is-repeating-slide';
import {isSlideNode} from '../utils/nodes/is-slide-node';

// ChoicesMap maps a choicesOriginRef to the list the choices.
export interface ChoicesMap {
  [name: string]: AjfChoice<any>[];
}

// ImageMap maps image urls to dataurls, like:
// 'http://whatever.com/image.png': 'data:image/png;base64,...'
export interface ImageMap {
  [url: string]: string;
}

// loadFormImages downloads the images referenced by the form's signature fields
// (via their AjfFile.url) and returns a map from url to dataurl, analogous to
// loadReportImages for reports.
export function loadFormImages(form: AjfForm, context?: AjfContext): Promise<ImageMap> {
  if (context == null) {
    return Promise.resolve({});
  }
  const promises: Promise<ImageMap>[] = [];
  for (const slide of form.nodes) {
    if (isSlideNode(slide)) {
      promises.push(loadSlideImages(slide, context));
    } else if (isRepeatingSlide(slide)) {
      promises.push(loadRepeatingSlideImages(slide, context));
    }
  }
  return Promise.all(promises).then(mergeImageMaps);
}

function loadRepeatingSlideImages(slide: AjfRepeatingSlide, context: AjfContext): Promise<ImageMap> {
  let repeats = 3; // default, if no formData
  const maxRepeats = 20;
  if (slide.name != null) {
    const r = context[slide.name];
    if (typeof r === 'number') {
      repeats = Math.min(r, maxRepeats);
    }
  }
  const promises: Promise<ImageMap>[] = [];
  for (let r = 0; r < repeats; r++) {
    promises.push(loadSlideImages(slide, context, r));
  }
  return Promise.all(promises).then(mergeImageMaps);
}

function loadSlideImages(
  slide: AjfSlide | AjfRepeatingSlide,
  context: AjfContext,
  rep?: number,
): Promise<ImageMap> {
  const promises: Promise<ImageMap>[] = [];
  for (const field of slide.nodes) {
    if (isField(field) && field.fieldType === AjfFieldType.Signature) {
      let name = field.name + (rep != null ? '__' + rep : '');
      promises.push(loadSignatureImage(context[name]));
    }
  }
  return Promise.all(promises).then(mergeImageMaps);
}

function loadSignatureImage(value: unknown): Promise<ImageMap> {
  if (value == null || typeof value !== 'object') {
    return Promise.resolve({});
  }
  const file = value as AjfFile;
  if (typeof file.content === 'string' && file.content.startsWith('data:image')) {
    // the image is already embedded, nothing to download.
    return Promise.resolve({});
  }
  if (typeof file.url !== 'string' || file.url === '') {
    return Promise.resolve({});
  }
  const url = file.url;
  return new Promise<ImageMap>(resolve => {
    const req = new XMLHttpRequest();
    req.onerror = () => resolve({}); // ignore 404's
    req.onload = () => {
      const r = new FileReader();
      r.onerror = () => resolve({});
      r.onloadend = () => {
        const result = r.result as string;
        if (result.startsWith('data:image')) {
          resolve({[url]: result});
        } else {
          resolve({});
        }
      };
      r.readAsDataURL(req.response);
    };
    req.open('GET', url);
    req.responseType = 'blob';
    req.send();
  });
}

function mergeImageMaps(maps: ImageMap[]): ImageMap {
  let map: ImageMap = {};
  for (const m of maps) {
    map = {...map, ...m};
  }
  return map;
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
