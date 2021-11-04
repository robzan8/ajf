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

import {ChartColor} from 'chart.js';
import * as XLSX from 'xlsx';

import {AjfFormula, createFormula} from '@ajf/core/models';
import {backgroundColor} from '../report-from-form/styles';

import {indicatorToJs} from './hindikit-parser';
import {htmlWidget, widgetStyle} from './styles';
import {createDataset} from '../utils/dataset/create-dataset';
import {createReportContainer} from '../utils/reports/create-report-container';
import {AjfWidgetCreate, createWidget} from '../utils/widgets/create-widget';
import {AjfWidgetType} from '../interface/widgets/widget-type';
import {AjfTableDataset} from '../interface/dataset/table-dataset';
import {AjfChartDataset} from '../interface/dataset/chart-dataset';
import {AjfChartDatasetOptions} from '../interface/dataset/chart-dataset-options';
import {AjfChartType} from '../interface/charts/chart-type';
import {AjfWidget} from '../interface/widgets/widget';
import {AjfReport} from '../interface/reports/report';
import {AjfReportVariable} from '../interface/reports/report-variable';
import {AjfReportContainer} from '../interface/reports/report-container';

/**
 * This function returns a basic report for any form passed in input.
 *
 * @param form the form schema
 * @param [id] the id of the form inside the plathform.
 */
export function reportFromXls(file: string): AjfReport {
  const workbook = XLSX.read(file, {type: 'binary'});
  const report: AjfReport = {};
  const reportWidgets: AjfWidget[] = [];
  const variables: AjfReportVariable[] = [];

  workbook.SheetNames.forEach(sheetName => {
    const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet) as {name: string; value: string}[];

    if (sheetName === 'variables') {
      json
        .filter(e => e != null && e.name != null && e.value != null)
        .forEach(elem => {
          let indicator = elem.value;
          try {
            indicator = indicatorToJs(elem.value);
          } catch (e) {
            console.log(e);
          }
          variables.push({name: elem.name, formula: {formula: indicator}} as AjfReportVariable);
        });
    } else {
      if (sheetName.includes('table')) {
        const tableWidget = _buildTable(json);
        reportWidgets.push(tableWidget);
      } else if (sheetName.includes('chart')) {
        const chartWidget = _buildChart(json);
        reportWidgets.push(chartWidget);
      } else if (sheetName.includes('html')) {
        const chartWidget = _buildHtml(json);
        reportWidgets.push(chartWidget);
      }
    }
  });

  report.variables = variables;
  report.content = createReportContainer({content: [...reportWidgets]} as AjfReportContainer);

  return report;
}

function _buildChart(json: {[key: string]: string}[]): AjfWidget {
  const optionLabels = ['chartType', 'title'];
  const chartOptions: {[key: string]: string} = {};
  const datasetObj: {[key: string]: any} = {};
  const dataset: AjfChartDataset[] = [];
  let labels: AjfFormula = {formula: `[]`};

  if (json.length > 0) {
    const firstRow = json[0];
    optionLabels.forEach(optionLabel => {
      if (firstRow[optionLabel] != null) {
        chartOptions[optionLabel] = firstRow[optionLabel];
        delete firstRow[optionLabel];
      }
    });
  }
  json.forEach(row => {
    const rowKeys = Object.keys(row);
    rowKeys.forEach(rowKey => {
      const value = row[rowKey];
      if (datasetObj[rowKey] == null) {
        datasetObj[rowKey] = [value];
      } else {
        datasetObj[rowKey].push(value);
      }
    });
  });
  if (datasetObj.labels != null) {
    labels = {formula: `plainArray([${datasetObj.labels}])`};
    delete datasetObj.labels;
  }
  Object.keys(datasetObj).forEach((datasetObjKey, index) => {
    const datasetRow = datasetObj[datasetObjKey].map((r: string) => indicatorToJs(`${r}`));

    const colorCondition =
      chartOptions.chartType === 'Pie' ||
      chartOptions.chartType === 'PolarArea' ||
      chartOptions.chartType === 'Doughnut';
    const backColor = colorCondition ? backgroundColor : backgroundColor[index];
    const formula: AjfFormula[] = [
      createFormula({formula: `plainArray([${datasetRow.toString()}])`}),
    ];
    const datasetOptions: AjfChartDatasetOptions = {backgroundColor: backColor as ChartColor};
    dataset.push({
      ...createDataset({aggregation: {aggregation: 0}, formula, label: datasetObjKey}),
      options: datasetOptions,
    } as AjfChartDataset);
  });

  return _buildWidget({
    widgetType: AjfWidgetType.Chart,
    type: AjfChartType[chartOptions.chartType as any] as unknown as AjfChartType,
    labels,
    dataset,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {display: true, position: 'bottom'},
      title: {display: true, text: `${chartOptions.title || ''}`.replace(/"/gi, '')},
    },
    styles: {width: '100%', height: '500px'},
    exportable: true,
  } as AjfWidgetCreate);
}

function _buildHtml(json: {[key: string]: string}[]): AjfWidget {
  const firstRow = json.length > 0 && json[0].html != null ? json[0] : {html: ''};

  return _buildWidget({
    widgetType: AjfWidgetType.Text,
    htmlText: `${firstRow.html}`,
    styles: htmlWidget,
  } as AjfWidgetCreate);
}

function _buildTable(json: {[key: string]: string}[]): AjfWidget {
  const rowspan = 1;
  const dataElements: any[][] = [];
  let titles = [] as string[];
  let colspans = [] as number[];
  let tableHeader = [] as AjfTableDataset[];
  if (json.length > 0) {
    const titlesRow = json.splice(0, 1)[0];
    titles = Object.keys(titlesRow);
    colspans = titles.map(key => +titlesRow[key]);
    tableHeader = titles.map(
      (title, index) =>
        ({
          label: '',
          formula: {formula: `\"${title}\"`},
          aggregation: {aggregation: 0},
          colspan: colspans[index],
          rowspan,
          style: {
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: '#3f51b5',
          },
        } as AjfTableDataset),
    );

    json.forEach(row => {
      const elems: any[] = [];
      titles.forEach(title => {
        let elem: string = row[title] || `\"\"`;
        try {
          elem = indicatorToJs(elem);
        } catch (err) {
          console.log('erro', elem, title, row);
          console.log(err.message);
          elem = `${row[title]}`;
        }
        elems.push(elem.replace(/[\*\/\r\n]|@[\w-]+/g, ''));
      });
      dataElements.push(elems);
    });
  }

  return _buildWidget({
    widgetType: AjfWidgetType.DynamicTable,
    rowDefinition: {
      formula: `buildDataset([${dataElements}],${JSON.stringify(colspans)})`,
    },
    dataset: tableHeader,
    exportable: true,
    cellStyles: {
      textAlign: 'center',
      color: 'black',
      backgroundColor: 'white',
    },
    styles: {
      borderCollapse: 'collapse',
    },
  } as AjfWidgetCreate);
}

function _buildWidget(widget: AjfWidgetCreate): AjfWidget {
  return createWidget({
    widgetType: AjfWidgetType.Column,
    columns: [1],
    content: [createWidget(widget)],
    styles: widgetStyle,
  } as AjfWidgetCreate);
}
