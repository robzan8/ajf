## API Report File for "ajf-srcs"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { AfterViewInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { ChartType } from 'chart.js';
import { ElementRef } from '@angular/core';
import * as i0 from '@angular/core';
import { OnChanges } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { SimpleChanges } from '@angular/core';

// @public (undocumented)
export class AjfChartComponent implements AfterViewInit, OnChanges {
    constructor(_el: ElementRef, _renderer: Renderer2);
    // (undocumented)
    chartType: ExtendedChartType;
    // (undocumented)
    data: ChartData;
    // (undocumented)
    instance: ChartWidgetInstance;
    // (undocumented)
    ngAfterViewInit(): void;
    // (undocumented)
    ngOnChanges(changes: SimpleChanges): void;
    // (undocumented)
    options: ChartOptions;
    // (undocumented)
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfChartComponent, "ajf-chart", never, { "data": "data"; "options": "options"; "chartType": "chartType"; "instance": "instance"; }, {}, never, never>;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfChartComponent, never>;
}

// @public (undocumented)
export class AjfChartModule {
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfChartModule, never>;
    // (undocumented)
    static ɵinj: i0.ɵɵInjectorDeclaration<AjfChartModule>;
    // (undocumented)
    static ɵmod: i0.ɵɵNgModuleDeclaration<AjfChartModule, [typeof i1.AjfChartComponent], never, [typeof i1.AjfChartComponent]>;
}

// @public (undocumented)
export type ExtendedChartType = ChartType | 'horizontalBar' | 'scatter' | 'pie';

// @public
export function registerChartPlugins(plugins: any[]): void;

// (No @packageDocumentation comment for this package)

```