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

import {
  ChangeDetectionStrategy, Component, ViewEncapsulation, forwardRef,
  Directive, ElementRef, ViewChild, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

import {AjfGeolocation} from '@ajf/core/geolocation';


export const GEOLOCATION_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AjfGeolocationComponent),
  multi: true
};

@Directive({
  selector: '[geolocationContainer]'
})
export class AjfGeolocationContainerDirective {
  get htmlElement(): HTMLElement { return this._el.nativeElement; }

  constructor(private _el: ElementRef) { }
}

/**
 * Ajf geolocation component.
 */
@Component({
  moduleId: module.id,
  selector: 'ajf-geolocation',
  templateUrl: 'geolocation.html',
  styleUrls: ['geolocation.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GEOLOCATION_CONTROL_VALUE_ACCESSOR]
})
export class AjfGeolocationComponent extends AjfGeolocation implements OnInit {
  @ViewChild(AjfGeolocationContainerDirective) mapContainer: AjfGeolocationContainerDirective;

  constructor() { super(); }

  ngOnInit() {
    this.htmlElement = this.mapContainer.htmlElement;
  }
}
