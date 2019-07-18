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

import {Input} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';

import * as L from 'leaflet';

import {Coordinate} from './geolocation-interface';
/**
 * Ajf geolocation component.
 */
export abstract class AjfGeolocation implements ControlValueAccessor {

  private _coordinate: Coordinate;
  get value(): Coordinate {return this._coordinate; }
  set value(coord: Coordinate) {this._coordinate = coord; }

  private _tileLayer: string;
  @Input() set tileLayer(tileLayer: string) {this._tileLayer = tileLayer; }

  private _map: L.Map;
  get map(): L.Map {return this._map; }

  private _marker: L.Marker;
  get marker(): L.Marker {return this._marker; }

  private _htmlElement: HTMLElement;
  set htmlElement(value: HTMLElement) {
    this._htmlElement = value;
    this._initMap();
    this._addTileLayerToMap();
  }
  /* tslint:disable:no-unused-variable */
  private onChange: Function;
  /* tslint:disable:no-unused-variable */
  private onTouched: Function;

  constructor() {}

  private _initMap(): void {
    const options = {zoomControl: true, attributionControl: false};
    this._map = L.map(this._htmlElement, options);
    this._map.on('click', this._reloadMarker);
  }

  private _setMapView(): void {
    if (this._map == null) {return; }
    this._map.setView([this._coordinate.lat, this._coordinate.long], this._coordinate.alt || 14);
  }

  private _reloadMarker: L.LeafletEventHandlerFn = (event: L.LeafletEvent) => {
    let position: L.LatLng;
    if (event.type === 'click') {
      position = (event as L.LeafletMouseEvent).latlng;
    } else {
      position = (event as L.DragEndEvent).target.getLatLng();
    }
    this._coordinate.lat = +position.lat.toFixed(2);
    this._coordinate.long = +position.lng.toFixed(2);
    const innerHtml: string = `
    <b>latitude:</b> ${this._coordinate.lat}<br>
    <b>longitude:</b> ${this._coordinate.long}<br>
    <b>altitude:</b> ${this._coordinate.alt}`;

    this._marker.setLatLng(position);
    this._marker.bindPopup(innerHtml).openPopup();
  }

  private _addTileLayerToMap(): void {
    if (this._map == null || this._tileLayer == null) {return; }
    this._map.eachLayer((l) => this._map.removeLayer(l));
    L.tileLayer(this._tileLayer, {attribution: ''}).addTo(this._map);
  }

  private _addMarkerToMap(): void {
    if (this._map == null) {return; }
    const innerHtml: string = `
    <b>latitude:</b> ${this._coordinate.lat}
    <br><b>longitude:</b> ${this._coordinate.long}
    <br><b>altitude:</b> ${this._coordinate.alt}`;

    this._marker = L.marker([this._coordinate.lat, this._coordinate.long], {
      draggable: true,
      icon: L.divIcon({
        iconSize: [20, 20],
        popupAnchor: [2, -15],
        html: '<i class="material-icons">gps_fixed</i>',
        className: 'marker-container'
      })
    }).addTo(this._map);
    this._marker.bindPopup(innerHtml).openPopup();
    this._marker.on('dragend', this._reloadMarker);
  }

  redraw(): void {if (this._map) {this._map.invalidateSize(); } }
  registerOnChange(fn: any): void {this.onChange = fn; }
  registerOnTouched(fn: any): void {this.onTouched = fn; }
  writeValue(obj: Coordinate): void {
    if (obj == null) {throw new Error('missed coordinate'); }
    if (obj.lat == null) {throw new Error('missed latitude'); }
    if (obj.long == null) {throw new Error('missed longitude'); }
    if (typeof obj.lat !== 'number') {throw new Error('latitude is not a number'); }
    if (typeof obj.long !== 'number') {throw new Error('longitude is not a number'); }
    if (obj.alt && typeof obj.alt !== 'number') {throw new Error('altitude is not a number'); }

    this._coordinate = obj;
    this._setMapView();
    this._addMarkerToMap();
  }
}
