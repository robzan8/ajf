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
  AjfReportInstance, AjfReportContainerInstance, AjfWidgetInstance, AjfWidgetType,
  AjfLayoutWidgetInstance, AjfImageWidgetInstance, AjfTextWidgetInstance,
  AjfColumnWidgetInstance, AjfFormulaWidgetInstance, AjfChartWidgetInstance,
  AjfTableWidgetInstance
} from '@ajf/core/reports';
import { AjfImageType } from '@ajf/core/image';

import { ImageMap, loadReportImages } from './load-report-images';

import * as pdfMake from 'pdfmake/build/pdfmake';
import { vfs_fonts } from './vfs_fonts';
(pdfMake as any).vfs = vfs_fonts;

export function openReportPdf(report: AjfReportInstance) {
  createReportPdf(report).then(pdf => {
    pdf.open()
  });
}

export function createReportPdf(report: AjfReportInstance): Promise<pdfMake.TCreatedPdf> {
  return new Promise<pdfMake.TCreatedPdf>(resolve => {
    loadReportImages(report).then(images => {
      const pdfDef = reportToPdf(report, images);
      resolve(pdfMake.createPdf(pdfDef));
    });
  });
}

function reportToPdf(report: AjfReportInstance, images: ImageMap): pdfMake.TDocumentDefinitions {
  return {
    header: report.header ? () => containerToPdf(report.header!, images) : undefined,
    content: report.content ? containerToPdf(report.content, images) : '',
    footer: report.footer ? () => containerToPdf(report.footer!, images) : undefined,
  };
}

function containerToPdf(container: AjfReportContainerInstance, images: ImageMap): pdfMake.Content {
  return { stack: container.content.map(w => widgetToPdf(w, images)) };
}

function widgetToPdf(widget: AjfWidgetInstance, images: ImageMap): pdfMake.Content {
  switch (widget.widget.widgetType) {
  case AjfWidgetType.Layout:
    const lw = widget as AjfLayoutWidgetInstance;
    return { columns: lw.content.map(w => widgetToPdf(w, images)) };
  case AjfWidgetType.PageBreak:
    return { pageBreak: 'after' };
  case AjfWidgetType.Image:
    return imageToPdf(widget as AjfImageWidgetInstance, images);
  case AjfWidgetType.Text:
    const tw = widget as AjfTextWidgetInstance;
    return { text: tw.htmlText };
  case AjfWidgetType.Chart:
    const chart = widget as AjfChartWidgetInstance;
    const dataUrl = chart.canvasDataUrl == null ? '' : chart.canvasDataUrl();
    if (dataUrl === '') {
      return { text: '[chart with no attached canvas]' };
    }
    return { image: dataUrl };
  case AjfWidgetType.Table:
    const table = widget as AjfTableWidgetInstance;
    if (table.data == null || table.data.length === 0) {
      return { text: '' };
    }
    const body = table.data.map((row, i) => row.map((cell, j) => ({
      text: table.dataset[i][j],
      colSpan: cell.colspan,
      rowSpan: cell.rowspan,
    })));
    return { table: {
      headerRows: 0,
      widths: Array(table.data[0].length).fill('*'),
      body,
    }};
  case AjfWidgetType.Column:
    const cw = widget as AjfColumnWidgetInstance;
    return { stack: cw.content.map(w => widgetToPdf(w, images)), width: '100%' };
  case AjfWidgetType.Formula:
    const fw = widget as AjfFormulaWidgetInstance;
    return { text: fw.formula };
  default:
    return { text: '' };
  }
}

function imageToPdf(image: AjfImageWidgetInstance, images: ImageMap): pdfMake.Content {
  if (image.widget.imageType !== AjfImageType.Image) {
    return { text: '' } // flags and icons still unsupported
  }
  const dataUrl = images[image.url];
  if (dataUrl == null) {
    return {text: '[no data for image url: ' + image.url + ']'};
  }
  return { image: dataUrl, width: 200 };
}
