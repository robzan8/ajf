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

import {Observable} from 'rxjs';

export interface AjfChoice<T> {
  label: string;
  value: T;
  translatedLabel?: string;
}

export type AjfChoicesOriginType =
  | 'fixed'
  | 'function'
  | 'observable'
  | 'observableArray'
  | 'promise';

export const enum AjfChoicesType {
  String,
  Number,
  LENGTH,
}

export type AjfChoicesFunction<T> = () => AjfChoice<T>[];

export interface AjfBaseChoicesOrigin<T> {
  type: AjfChoicesOriginType;
  name: string;
  label: string;
  choices: AjfChoice<T>[];
}

export interface AjfChoicesFixedOrigin<T> extends AjfBaseChoicesOrigin<T> {
  type: 'fixed';
}

export interface AjfChoicesFunctionOrigin<T> extends AjfBaseChoicesOrigin<T> {
  type: 'function';
  generator: AjfChoicesFunction<T>;
}

export interface AjfChoicesObservableOrigin<T> extends AjfBaseChoicesOrigin<T> {
  type: 'observable';
  generator: Observable<AjfChoice<T>>;
}

export interface AjfChoicesObservableArrayOrigin<T> extends AjfBaseChoicesOrigin<T> {
  type: 'observableArray';
  generator: Observable<AjfChoice<T>[]>;
}

export interface AjfChoicesPromiseOrigin<T> extends AjfBaseChoicesOrigin<T> {
  type: 'promise';
  generator: Promise<AjfChoice<T>[]>;
}

export type AjfChoicesOrigin<T> =
  | AjfChoicesFixedOrigin<T>
  | AjfChoicesFunctionOrigin<T>
  | AjfChoicesObservableArrayOrigin<T>
  | AjfChoicesObservableOrigin<T>
  | AjfChoicesPromiseOrigin<T>;
