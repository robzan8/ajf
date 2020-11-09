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

import {
  AjfReportInstance, AjfReportContainerInstance, AjfWidgetInstance, AjfWidgetType,
  AjfLayoutWidgetInstance, AjfImageWidgetInstance, AjfTextWidgetInstance,
  AjfColumnWidgetInstance, AjfFormulaWidgetInstance, AjfChartWidgetInstance,
  AjfTableWidgetInstance
} from '@ajf/core/reports';
import {AjfImageType} from '@ajf/core/image';

import {ImageMap, loadReportImages} from './load-report-images';

import {createPdf, TCreatedPdf} from 'pdfmake/build/pdfmake';
import {
  Column,
  Content,
  ContentStack,
  PageOrientation,
  TDocumentDefinitions
} from 'pdfmake/interfaces';

export function openReportPdf(report: AjfReportInstance, orientation?: PageOrientation) {
  createReportPdf(report, orientation).then(pdf => {
    pdf.open();
  });
}

export function createReportPdf(report: AjfReportInstance, orientation?: PageOrientation):
  Promise<TCreatedPdf> {

  return new Promise<TCreatedPdf>(resolve => {
    loadReportImages(report).then(images => {
      let width = 595.28 - 40 * 2; // A4 page width - margins
      if (orientation === 'landscape') {
        width = 841.89 - 40 * 2;
      }
      const pdfDef = reportToPdf(report, images, width);
      pdfDef.pageOrientation = orientation;
      resolve(createPdf(pdfDef));
    });
  });
}

function reportToPdf(report: AjfReportInstance, images: ImageMap, width: number):
  TDocumentDefinitions {

  return {
    header: report.header ? () => containerToPdf(report.header!, images, width) : undefined,
    content: report.content ? containerToPdf(report.content, images, width) : '',
    footer: report.footer ? () => containerToPdf(report.footer!, images, width) : undefined,
  };
}

function containerToPdf(container: AjfReportContainerInstance, images: ImageMap, width: number):
  Content {

  return { stack: container.content.map(w => widgetToPdf(w, images, width)) };
}

const marginBetweenWidgets = 10;

function widgetToPdf(widget: AjfWidgetInstance, images: ImageMap, width: number): Content {
  switch (widget.widget.widgetType) {
  case AjfWidgetType.Layout:
    return layoutToPdf(widget as AjfLayoutWidgetInstance, images, width);
  case AjfWidgetType.PageBreak:
    return { text: '', pageBreak: 'after' };
  case AjfWidgetType.Image:
    return imageToPdf(widget as AjfImageWidgetInstance, images, width);
  case AjfWidgetType.Text:
    return textToPdf(widget as AjfTextWidgetInstance);
  case AjfWidgetType.Chart:
    const chart = widget as AjfChartWidgetInstance;
    const dataUrl = chart.canvasDataUrl == null ? '' : chart.canvasDataUrl();
    if (dataUrl === '') {
      return { text: '[chart with no attached canvas]' };
    }
    return { image: dataUrl, width, margin: [0, 0, 0, marginBetweenWidgets] };
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
    return { table: { headerRows: 0, body }, margin: [0, 0, 0, marginBetweenWidgets] };
  case AjfWidgetType.Column:
    const cw = widget as AjfColumnWidgetInstance;
    return { stack: cw.content.map(w => widgetToPdf(w, images, width)) };
  case AjfWidgetType.Formula:
    const fw = widget as AjfFormulaWidgetInstance;
    return { text: fw.formula, margin: [0, 0, 0, marginBetweenWidgets] };
  default:
    return { text: '' };
  }
}

function layoutToPdf(lw: AjfLayoutWidgetInstance, images: ImageMap, width: number): Content {
  const columns = [...lw.widget.columns];
  while (columns.length < lw.content.length) {
    columns.push(1);
  }
  const childWidth = width / (columns.length || 1);
  const children = [];
  for (let i = 0; i < lw.content.length; i++) {
    let child = widgetToPdf(lw.content[i], images, childWidth) as ContentStack;
    // Children of Layout widgets are supposed to be Columns. If they aren't,
    // we must wrap them to avoid problems like images having an 'auto' width.
    if (child.stack == null) {
      child = { stack: [child] };
    }
    (child as Column).width = columns[i] === -1 ? 'auto' : '*';
    children.push(child);
  }
  return { columns: children };
}

function imageToPdf(image: AjfImageWidgetInstance, images: ImageMap, width: number): Content {
  if (image.widget.imageType !== AjfImageType.Image) {
    // Can't get icons to work, pdfs with multiple fonts don't seem to be working
    return { text: '' };
  }
  const dataUrl = images[image.url];
  if (dataUrl == null) {
    return { text: `[no data for image url: ${image.url}]` };
  }
  return { image: dataUrl, width, margin: [0, 0, 0, marginBetweenWidgets] };
}

function textToPdf(tw: AjfTextWidgetInstance): Content {
    const text: Content = {
      text: stripHTML(tw.htmlText),
      margin: [0, 0, 0, marginBetweenWidgets],
    };
    if (tw.htmlText.startsWith('<h1>')) {
      text.fontSize = 20;
      text.margin = [0, 10, 0, marginBetweenWidgets];
    } else if (tw.htmlText.startsWith('<h2>')) {
      text.fontSize = 15;
      text.margin = [0, 5, 0, marginBetweenWidgets];
    }
    return text;
}

function stripHTML(s: string): string {
  return s.replace(/<\/?[^>]+(>|$)/g, '');
}
