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

import {OverlayContainer} from '@angular/cdk/overlay';
import {Component, ElementRef, ViewEncapsulation} from '@angular/core';

/**
 * DevApp with toolbar and sidenav.
 */
@Component({
  moduleId: module.id,
  selector: 'dev-app',
  templateUrl: 'dev-app.html',
  styleUrls: ['dev-app.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DevAppComponent {
  dark = false;
  navItems = [
    {name: 'Examples', route: '/examples'},
    {name: 'Calendar', route: '/calendar'},
    {name: 'Checkbox Group', route: '/checkbox-group'},
    {name: 'Form Builder', route: '/form-builder'},
    {name: 'Forms', route: '/forms'},
    {name: 'Image', route: '/image'},
    {name: 'Node Icon', route: '/node-icon'},
    {name: 'Page Slider', route: '/page-slider'},
    {name: 'Report Builder', route: '/report-builder'},
    {name: 'Reports', route: '/reports'},
    {name: 'Time', route: '/time'},
  ];

  constructor(
    private _element: ElementRef<HTMLElement>,
    private _overlayContainer: OverlayContainer) {}

  toggleFullscreen() {
    // Cast to `any`, because the typings don't include the browser-prefixed methods.
    const elem = this._element.nativeElement.querySelector('.demo-content') as any;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullScreen) {
      elem.msRequestFullScreen();
    }
  }

  toggleTheme() {
    const darkThemeClass = 'demo-unicorn-dark-theme';

    this.dark = !this.dark;

    if (this.dark) {
      this._element.nativeElement.classList.add(darkThemeClass);
      this._overlayContainer.getContainerElement().classList.add(darkThemeClass);
    } else {
      this._element.nativeElement.classList.remove(darkThemeClass);
      this._overlayContainer.getContainerElement().classList.remove(darkThemeClass);
    }
  }
}

/**
 * Home component for welcome message in DemoApp.
 */
@Component({
  selector: 'home',
  template: `
    <p>Welcome to the development demos for Ajf!</p>
    <p>Open the sidenav to select a demo.</p>
  `,
})
export class DevAppHome {}
