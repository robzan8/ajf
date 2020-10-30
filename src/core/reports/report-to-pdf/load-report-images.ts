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
  AjfReportInstance,
  AjfReportContainerInstance,
  AjfWidgetInstance,
  AjfWidgetType,
  AjfWidgetWithContentInstance,
  AjfImageWidgetInstance
} from '@ajf/core/reports';
import {AjfImageType} from '@ajf/core/image';

// ImageMap maps image urls to dataurls, like:
// 'http://whatever.com/image.png': 'data:image/png;base64,...'
export interface ImageMap {
  [url: string]: string;
}

export function loadReportImages(report: AjfReportInstance): Promise<ImageMap> {
  const promises: Promise<ImageMap>[] = [];
  if (report.header != null) {
    promises.push(loadContainerImages(report.header));
  }
  if (report.content != null) {
    promises.push(loadContainerImages(report.content));
  }
  if (report.footer != null) {
    promises.push(loadContainerImages(report.footer));
  }
  return new Promise<ImageMap>(resolve => {
    Promise.all(promises).then(maps => {
      let result: ImageMap = {};
      for (const m of maps) {
        result = {...result, ...m};
      }
      resolve(result);
    });
  });
}

function loadContainerImages(container: AjfReportContainerInstance|AjfWidgetWithContentInstance):
  Promise<ImageMap> {
  const promises: Promise<ImageMap>[] = [];
  for (let widget of container.content) {
    promises.push(loadWidgetImages(widget));
  }
  return new Promise<ImageMap>(resolve => {
    Promise.all(promises).then(maps => {
      let result: ImageMap = {};
      for (const m of maps) {
        result = {...result, ...m};
      }
      resolve(result);
    });
  });
}

function loadWidgetImages(widget: AjfWidgetInstance): Promise<ImageMap> {
  switch (widget.widgetType) {
  case AjfWidgetType.Layout:
  case AjfWidgetType.Column:
    return loadContainerImages(widget as AjfWidgetWithContentInstance);
  case AjfWidgetType.Image:
    const image = widget as AjfImageWidgetInstance;
    if (image.widget.imageType !== AjfImageType.Image) {
      break;
    }
    return new Promise<ImageMap>(resolve => {
      const req = new XMLHttpRequest();
      req.onerror = () => resolve({}); // ignore 404's
      req.onload = () => {
        const r = new FileReader();
        r.onerror = () => resolve({});
        r.onloadend = () => {
          const result: ImageMap = {};
          result[image.url] = r.result as string;
          resolve(result);
        };
        r.readAsDataURL(req.response);
      };
      req.open('GET', image.url);
      req.responseType = 'blob';
      req.send();
    });
  }
  return new Promise<ImageMap>(resolve => resolve({}));
}