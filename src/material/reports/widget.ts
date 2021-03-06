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
  AjfBaseWidgetComponent,
  AjfColumnWidgetInstance,
  AjfLayoutWidgetInstance,
  AjfReportWidget as CoreComponent,
  AjfWidgetComponentsMap,
  AjfWidgetService as CoreService,
  AjfWidgetType as wt,
} from '@ajf/core/reports';
import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Injectable,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {AjfChartWidgetComponent} from './chart-widget';
import {AjfFormulaWidgetComponent} from './formula-widget';
import {AjfImageContainerWidgetComponent} from './image-container-widget';
import {AjfImageWidgetComponent} from './image-widget';
import {AjfMapWidgetComponent} from './map-widget';
import {AjfPageBreakWidgetComponent} from './page-break-widget';
import {AjfTableWidgetComponent} from './table-widget';
import {AjfTextWidgetComponent} from './text-widget';

const defaultWidgetsFactory = (): AjfWidgetComponentsMap => {
  const defaultWidgets = {} as AjfWidgetComponentsMap;
  defaultWidgets[wt.PageBreak] = {component: AjfPageBreakWidgetComponent};
  defaultWidgets[wt.Image] = {component: AjfImageWidgetComponent};
  defaultWidgets[wt.Text] = {component: AjfTextWidgetComponent};
  defaultWidgets[wt.Chart] = {component: AjfChartWidgetComponent};
  defaultWidgets[wt.Table] = {component: AjfTableWidgetComponent};
  defaultWidgets[wt.DynamicTable] = {component: AjfTableWidgetComponent};
  defaultWidgets[wt.Map] = {component: AjfMapWidgetComponent};
  defaultWidgets[wt.Column] = {component: AjfColumnWidgetComponent};
  defaultWidgets[wt.Formula] = {component: AjfFormulaWidgetComponent};
  defaultWidgets[wt.ImageContainer] = {component: AjfImageContainerWidgetComponent};
  return defaultWidgets;
};

@Injectable({providedIn: 'root'})
export class AjfWidgetService extends CoreService {
  constructor() {
    super(defaultWidgetsFactory());
  }
}

@Component({
  selector: 'ajf-widget',
  templateUrl: 'widget.html',
  styleUrls: ['widget.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AjfReportWidget extends CoreComponent {
  readonly widgetsMap: AjfWidgetComponentsMap;

  constructor(cfr: ComponentFactoryResolver, renderer: Renderer2, widgetService: AjfWidgetService) {
    super(cfr, renderer);
    this.widgetsMap = widgetService.componentsMap;
  }
}

@Component({
  templateUrl: 'column-widget.html',
  styleUrls: ['column-widget.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfColumnWidgetComponent extends AjfBaseWidgetComponent<AjfColumnWidgetInstance> {
  constructor(cdr: ChangeDetectorRef, el: ElementRef) {
    super(cdr, el);
  }
}

@Component({
  templateUrl: 'layout-widget.html',
  styleUrls: ['layout-widget.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfLayoutWidgetComponent extends
    AjfBaseWidgetComponent<AjfLayoutWidgetInstance> implements AfterContentChecked {
  private _allcolumnsRendered$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly allcolumnsRendered$: Observable<boolean> =
      this._allcolumnsRendered$ as Observable<boolean>;

  constructor(cdr: ChangeDetectorRef, el: ElementRef) {
    super(cdr, el);
  }
  ngAfterContentChecked(): void {
    this._allcolumnsRendered$.next(true);
  }
}
