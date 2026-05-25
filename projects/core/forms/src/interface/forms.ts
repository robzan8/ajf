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

import {AjfStringIdentifier} from '@ajf/core/common';
import {UntypedFormControl} from '@angular/forms';

import {AjfAttachmentsOrigin} from './attachments';
import {AjfChoicesOrigin} from './choices';
import {AjfRepeatingSlide} from './slides';
import {AjfSlide} from './slides';

export type AjfFormStringIdentifier = AjfStringIdentifier;

export type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

/**
 * An ng FormControl of a table.
 */
export interface AjfTableFormControl {
  /**
   * The ng FormControl
   */
  control: UntypedFormControl;

  /**
   * If set to true, the FormControl is allocated.
   * If set to false the value of the FormControl is shown only as plain text.
   */
  show: boolean;
  type: InputType;
}

/**
 * The main structure of a json schema representing a Form.
 */
export interface AjfForm {
  /**
   * The slides containing the Form nodes.
   */
  nodes: (AjfRepeatingSlide | AjfSlide)[];

  /**
   * The options for the single or multiple choices nodes.
   */
  choicesOrigins: AjfChoicesOrigin<any>[];

  // @TODO(tutti): check
  attachmentsOrigins: AjfAttachmentsOrigin<any>[];

  /**
   * An array of identifiers, each defined by a Label and a field value, used to show a brief
   * summary of the form data.
   */
  stringIdentifier: AjfFormStringIdentifier[];

  /**
   * A context specifying the initial state and values of a form.
   * It can be complemented and/or overwritten by the actual data.
   */
  initContext?: {[key: string]: string | string[] | number | number[]};

  /**
   * Any additional informations related to the Form.
   */
  supplementaryInformations?: any;

  /**
   * The validation state of the form, derived from the validation state of each
   * of its fields.
   */
  valid?: boolean;
}
