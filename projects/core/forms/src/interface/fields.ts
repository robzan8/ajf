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
import {Type} from '@angular/core';

import {AjfAttachmentsOrigin} from './attachments';
import {AjfChoice, AjfChoicesOrigin} from './choices';
import {InputType} from './forms';
import {AjfBaseNode, AjfNodeType} from './nodes';
import {AjfValidationGroup} from './validation';
import {AjfWarningGroup} from './warning';
import {AjfBaseFieldComponent} from '../base-field';
import {AjfFieldInstanceCreate} from '../utils/fields-instances/create-field-instance';
import {AjfFieldInstance} from './fields-instances';

/**
 * The available ajf field types.
 */
// tslint:disable-next-line:prefer-const-enum
export enum AjfFieldType {
  String,
  Text,
  Number,
  Boolean,
  SingleChoice,
  MultipleChoice,
  Formula,
  Empty,
  Date,
  DateInput,
  Time,
  Table,
  Geolocation,
  Barcode,
  File,
  Image,
  VideoUrl,
  Range,
  Signature,
  Audio,
  LENGTH,
}

/**
 * The size of the Field to be used when the Field is rendered
 */
export type AjfFieldSize = 'normal' | 'small' | 'smaller' | 'tiny' | 'mini';

/**
 * An ajf node of type Field. It is the building block for all the Fields in a Form.
 */
export interface AjfBaseField extends AjfBaseNode {
  /**
   * Type of the node.
   */
  nodeType: AjfNodeType.AjfField;

  /**
   * Type of the Field.
   */
  fieldType: AjfFieldType;

  /**
   * A brief description of the Field.
   */
  description?: string;

  /**
   * If set to true the Field input is editable
   */
  editable: boolean;

  /**
   * A formula used to derive the value of the field.
   * If set, makes the field input read-only (not editable).
   */
  formula?: AjfFormula;

  /**
   * The default value of the Field. It could be a value or a formula.
   * Is used only when the value is null.
   */
  defaultValue: any;

  /**
   * The size of the Field to be used when the Field is rendered
   */
  size: AjfFieldSize;

  /**
   * A set of conditions that defines if the Field value is valid.
   */
  validation?: AjfValidationGroup;

  /**
   * A set of conditions that defines if warning must be shown.
   */
  // @TODO(Marco, Peppe, Sara): Check if it is actually used and works as intended
  warning?: AjfWarningGroup;

  // @TODO(Marco, Peppe, Sara): Check if it is actually used and what it is
  nextSlideCondition?: AjfCondition;

  /**
   * The origin of the attachments related to the field.
   */
  attachmentOrigin?: AjfAttachmentsOrigin<any>;

  /**
   * Any attachments (files uploaded on the form) related to the field.
   */
  attachments?: any[];
  /*
   * Hint text visualized in tooltip used
   * to explain the mean of field
   */
  hint?: string;
  /**
   * Hint icon showed as anchor of hint
   */
  hintIcon?: string;

  // @TODO(Marco, Peppe, Sara, Trik): Check if both are used and why attachments is of type 'any[]'
  // and not 'AjfAttachment[]'.
}

/**
 * An AjfField of type AjfFieldWithChoices.
 */
export interface AjfFieldWithChoices<T> extends AjfBaseField {
  fieldType: AjfFieldType.MultipleChoice | AjfFieldType.SingleChoice;

  /**
   * The choices for the select element after choicesFilter
   */
  choices: AjfChoice<T>[];

  /**
   *  The source of the initial choices list, taken from the json schema
   */
  choicesOrigin: AjfChoicesOrigin<T>;

  /**
   * A formula to filter choices elements
   */
  choicesFilter?: AjfFormula;

  /**
   * Force the UI checkbox group display
   */
  forceExpanded: boolean;

  /**
   * Force the UI dropdown display
   */
  forceNarrow: boolean;

  // TODO: Check again when we'll comment the Form Renderer or any code relative
  // to the triggerConditions.
  triggerConditions?: AjfCondition[];
}

/**
 * Represents the association between an AjfFieldType and the
 * components used to render it.
 */
export interface AjfFieldComponentsMap {
  /**
   * The field type.
   */
  [key: number]: {
    /**
     * The field component.
     */
    component: Type<AjfBaseFieldComponent>;

    /**
     * The readonly field component.
     */
    readOnlyComponent?: Type<AjfBaseFieldComponent>;

    /**
     * The Angular inputs of the components.
     */
    inputs?: {[key: string]: any};

    /**
     * The signature and return type of the method used for create Instance.
     */
    createInstance?: (instance: AjfFieldInstanceCreate, context: AjfContext) => AjfFieldInstance;

    /**
     * If true, the field has choices.
     */
    isFieldWithChoice?: boolean;
  };
}

/**
 * An audio recording field.
 */
export interface AjfAudioField extends AjfBaseField {
  fieldType: AjfFieldType.Audio;
}

/**
 * An AjfField of type Barcode
 */
export interface AjfBarcodeField extends AjfBaseField {
  fieldType: AjfFieldType.Barcode;
}

/**
 * An AjfField of type Boolean
 */
export interface AjfBooleanField extends AjfBaseField {
  fieldType: AjfFieldType.Boolean;
}

/**
 * An AjfField of type Date.
 */
export interface AjfDateField extends AjfBaseField {
  fieldType: AjfFieldType.Date;

  /**
   * The min selectable date of the calendar.
   */
  minDate?: Date | 'today';

  /**
   * The max selectable date of the calendar.
   */
  maxDate?: Date | 'today';
}

/**
 * An AjfField of type DateInput
 */
export interface AjfDateInputField extends AjfBaseField {
  fieldType: AjfFieldType.DateInput;

  /**
   * The min selectable date of the calendar.
   */
  minDate: Date | 'today';

  /**
   * The max selectable date of the calendar.
   */
  maxDate: Date | 'today';
}

/**
 * An AjfField that contains an HTML.
 */
export interface AjfEmptyField extends AjfBaseField {
  fieldType: AjfFieldType.Empty;
  HTML: string;
}

/**
 * An AjfField of type File
 */
export interface AjfFileField extends AjfBaseField {
  fieldType: AjfFieldType.File;
}

/**
 * An AjfField of type Formula
 */
export interface AjfFormulaField extends AjfBaseField {
  fieldType: AjfFieldType.Formula;
}

/**
 * An AjfField of type Geolocation
 */
export interface AjfGeolocationField extends AjfBaseField {
  fieldType: AjfFieldType.Geolocation;
}

/**
 * An AjfField of type Image.
 */
export interface AjfImageField extends AjfBaseField {
  fieldType: AjfFieldType.Image;
}

/**
 * An AjfField of type MultipleChoice.
 */
export interface AjfMultipleChoiceField<T> extends AjfFieldWithChoices<T> {
  fieldType: AjfFieldType.MultipleChoice;
}

/**
 * An AjfField of type Number.
 */
export interface AjfNumberField extends AjfBaseField {
  fieldType: AjfFieldType.Number;
}

export interface AjfRangeField extends AjfBaseField {
  fieldType: AjfFieldType.Range;
  end?: number;
  start?: number;
  step?: number;
  appearance?: 'rating' | string;
}

/**
 * An AjfField of type Signature.
 */
export interface AjfSignatureField extends AjfBaseField {
  fieldType: AjfFieldType.Signature;
}

/**
 * An AjfField of type SingleChoice.
 */
export interface AjfSingleChoiceField<T> extends AjfFieldWithChoices<T> {
  fieldType: AjfFieldType.SingleChoice;
}

/**
 * An AjfField of type String.
 */
export interface AjfStringField extends AjfBaseField {
  fieldType: AjfFieldType.String;
}

export interface AjfTableCell {
  /**
   * If true the formula can be overridden by input value.
   */
  editable?: boolean;
  /**
   * The Formula associated with the cell.
   */
  formula: string;
}

/**
 * An AjfField of type Table.
 *
 *
 * Eg.
 * {
 *  id: 1,
 *  parent: 0,
 *  name: 'TableName',
 *  rows: [
 *     [
 *       'TableName__0__0',
 *       'TableName__0__1',
 *       {
 *         'formula': 'TableName__0__0 + TableName__0__1'
 *         'editable': false
 *       },
 *     ],
 *     ['TableName__1__0', 'TableName__1__1', 'TableName__1__2],
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
 */
export interface AjfTableField extends AjfBaseField {
  columnTypes: InputType[];
  fieldType: AjfFieldType.Table;
  // deprecated string type is used to maintain backward compatibility
  /**
   * The string|number array represents all the values in the row cells.
   * if string
   *  Every element of this matrix need to satisfy this format: name =
   * `${table.name}__${row.idx}__${column.idx}` This name is used also as the the control name in
   * the form formGroup.registerControl(name, tableFormControl.control);
   */
  rows: (string | AjfTableCell)[][];

  /**
   * The string array represents all the column labels.
   */
  columnLabels: string[];

  /**
   * The string array represents all the row labels.
   */
  rowLabels: string[];

  /**
   * If true, empty rows are not showed
   */
  hideEmptyRows: boolean;
}

/**
 * An AjfField of type Text.
 */
export interface AjfTextField extends AjfBaseField {
  fieldType: AjfFieldType.Text;
}

/**
 * An AjfField of type Time
 */
export interface AjfTimeField extends AjfBaseField {
  fieldType: AjfFieldType.Time;
}

export type AjfField<T = any> =
  | AjfBarcodeField
  | AjfBooleanField
  | AjfDateField
  | AjfDateInputField
  | AjfEmptyField
  | AjfFileField
  | AjfFieldWithChoices<T>
  | AjfFormulaField
  | AjfGeolocationField
  | AjfImageField
  | AjfMultipleChoiceField<T>
  | AjfNumberField
  | AjfRangeField
  | AjfSignatureField
  | AjfSingleChoiceField<T>
  | AjfStringField
  | AjfTableField
  | AjfTextField
  | AjfTimeField
  | AjfAudioField;
