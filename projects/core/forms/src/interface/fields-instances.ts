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

import {AjfCondition, AjfContext, AjfFormula} from '@ajf/core/models';
import {EventEmitter} from '@angular/core';

import {AjfChoice} from './choices';
import {
  AjfDateField,
  AjfDateInputField,
  AjfEmptyField,
  AjfField,
  AjfFieldWithChoices,
  AjfFormulaField,
  AjfRangeField,
  AjfTableField,
} from './fields';
import {AjfBaseNodeInstance} from './nodes-instances';
import {AjfValidationGroup} from './validation';
import {AjfValidationResult} from './validation';
import {AjfWarningGroup} from './warning';
import {AjfWarningResult} from './warning';
import {AjfTableFormControl} from './forms';

// TODO Check if and where it is actually used
export interface AjfFieldState {
  visibility: boolean;
  value: any;
}

/**
 * An AjfNodeInstance with a node of type AjfField.
 */
export interface AjfFieldInstance extends AjfBaseNodeInstance {
  /**
   * True if the field pass the validation
   */
  valid: boolean;

  /**
   * The AjfField blueprint
   */
  node: AjfField;

  /**
   * The value of the field
   */
  value: any;

  /**
   * A formula used to derive the value of the field.
   */
  formula?: AjfFormula;

  /**
   * A set of conditions that defines if the Field value is valid.
   */
  validation?: AjfValidationGroup;

  /**
   * A set of conditions that defines if warning must be shown.
   */
  warning?: AjfWarningGroup;

  // @TODO(Marco, Peppe, Sara, Trik): See AjfField (Check if it is actually used and what it is)
  nextSlideCondition?: AjfCondition;

  /**
   * The results of the evaluation of the validation group conditions
   */
  validationResults?: AjfValidationResult[];

  /**
   * The results of the evaluation of the warning group conditions
   */
  warningResults?: AjfWarningResult[];

  /**
   * Emitted when there are warningResults
   */
  warningTrigger: EventEmitter<void>;

  /**
   * The current node editability
   */
  editable: boolean;

  /**
   * AjfCondition for handling editability
   */
  readonly?: AjfCondition;
}

/**
 * An AjfFieldInstance with a node of type AjfDateField.
 */
export interface AjfDateFieldInstance extends AjfFieldInstance {
  node: AjfDateField;
}

/**
 * An AjfFieldInstance with a node of type AjfDateInputField.
 */
export interface AjfDateInputFieldInstance extends AjfFieldInstance {
  node: AjfDateInputField;
}

/**
 * An AjfFieldInstance with a node of type AjfEmptyField.
 */
export interface AjfEmptyFieldInstance extends AjfFieldInstance {
  node: AjfEmptyField;
}

/**
 * An AjfFieldInstance with a node of type AjfFieldWithChoicesInstance.
 */
export interface AjfFieldWithChoicesInstance<T> extends AjfFieldInstance {
  node: AjfFieldWithChoices<T>;

  /**
   * The filtered choices list, originally taken from json schema
   */
  filteredChoices: AjfChoice<any>[];

  /**
   * A formula to filter choices elements
   */
  choicesFilter?: AjfFormula;

  // TODO: Check again when we'll comment the Form Renderer or any code relative
  // to the triggerConditions.
  triggerConditions?: AjfCondition[];
  firstTriggerConditionDone: any;
  selectionTrigger: EventEmitter<void>;
}

/**
 * An AjfFieldInstance with a node of type AjfFormulaField.
 */
export interface AjfFormulaFieldInstance extends AjfFieldInstance {
  node: AjfFormulaField;

  /**
   * A formula used to derive the value of the formula field.
   */
  formula?: AjfFormula;
}

export interface AjfRangeFieldInstance extends AjfFieldInstance {
  node: AjfRangeField;
}

/**
 * An AjfFieldInstance with a node of type AjfTableField.
 */
export interface AjfTableFieldInstance extends AjfFieldInstance {
  node: AjfTableField;

  /**
   * If true, empty rows are not showed
   */
  hideEmptyRows: boolean;

  /**
   * List of values for the table (rows).
   * The table is horizontally organized: the first cell of each row represents
   * the 'Row Label' (like a horizontal 'column header').
   * The string|number array represents all the values in the other row cells.
   *
   * Eg.
   * {
   *   id: 1,
   *   parent: 0,
   *   name: 'row', // table name
   *   rows: [
   *     ['row__0__0', 'row__0__1', 'row__0__2],
   *     ['row__1__0', 'row__1__1', 'row__1__2],
   *   ],
   *   label: '2.1 Table test',
   *   editable: true,
   *   nodeType: 0,
   *   fieldType: 11,
   *   rowLabels: [
   *     'TestRow',
   *     'OtherTestRow',
   *   ],
   *   columnLabels: ['Label 1', 'Label 2', 'Label 3']
   * }
   *
   * value: [
   * ['TestRow', ['row__0__0', 'row__0__1', 'row__0__2]],
   * ['OtherTestRow', ['row__1__0', 'row__1__1', 'row__1__2]],
   * ]
   */
  value: [string, (string | number)[]][];

  /**
   * List of form control for the values
   */
  controls: [string, (string | AjfTableFormControl)[]][];

  /**
   * The table context
   */
  context: AjfContext;
}
