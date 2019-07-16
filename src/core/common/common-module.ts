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

import {NgModule} from '@angular/core';

import {ApplyStylesDirective} from './apply-styles-directive';
import {AutofocusDirective} from './auto-focus.directive';
import {FormatIfNumber} from './format-if-number';
import {TranslateIfString} from './translate-if-string';
<<<<<<< HEAD
import {CheckIfValid} from './check-if-valid';
=======
import {AjfFieldIsValidPipe} from './field-is-valid';
>>>>>>> 45d88da14a935c6fb6b5ffdec86021752cf491b3

@NgModule({
  declarations: [
    ApplyStylesDirective,
    AutofocusDirective,
    FormatIfNumber,
    TranslateIfString,
<<<<<<< HEAD
    CheckIfValid
=======
    AjfFieldIsValidPipe,
>>>>>>> 45d88da14a935c6fb6b5ffdec86021752cf491b3
  ],
  exports: [
    AjfFieldIsValidPipe,
    ApplyStylesDirective,
    AutofocusDirective,
    FormatIfNumber,
    TranslateIfString,
    CheckIfValid
  ],
})
export class AjfCommonModule { }
