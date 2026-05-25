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

import {AjfCondition, AjfFormula} from '@ajf/core/models';
import {EventEmitter} from '@angular/core';

import {AjfFieldInstance} from './fields-instances';
import {AjfNode, AjfNodeGroup, AjfRepeatingContainerNode, AjfRepeatingNode} from './nodes';
import {AjfRepeatingSlideInstance} from './slides-instances';
import {AjfSlideInstance} from './slides-instances';

/**
 * The instance of an ajfNode.
 * A single ajfNode can have multiple instances with different values
 * differentiated by a suffix, when used in a repeating slide.
 * (eg.
 * country__0 = 'ITA', country__1 = 'ESP'
 * city__0__0 = 'Milano', city__0__1 = 'Roma', city__1__0 = 'Madrid'
 * )
 *
 * The AjfNodeInstance visibility is determined by the visibility of the current branch
 * and  the visibility condition of the node itself.
 * @see {@link updateVisibility}
 * @see {@link updateConditionalBranches}
 */
// TODO Check if jsDoc @see and @link actually work and are displayed as intended
export interface AjfBaseNodeInstance {
  /**
   * The AjfNode blueprint from which this node instance is generated
   */
  node: AjfNode;

  /**
   * Array of prefixes that identifies the tree of all the ancestor nodes indexes
   */
  prefix: number[];

  /**
   * The current node visibility
   */
  visible: boolean;

  /**
   * List of conditions that determines the branch to be followed
   */
  conditionalBranches: AjfCondition[];

  /**
   * AjfCondition for handling visibility
   */
  visibility?: AjfCondition;

  /**
   * Identifies the index of the condition verified and is equal to the
   * parentNode of branch that determines..?
   */
  // TODO ask Trik
  verifiedBranch?: number;

  /**
   * Emitted when any property of the node instance has changed value
   */
  updatedEvt: EventEmitter<void>;
}

/**
 * An AjfNodeInstance that contains other AjfNodeInstances.
 */
export interface AjfContainerNodeInstance extends AjfBaseNodeInstance {
  /**
   * The children NodeInstances
   */
  nodes: AjfNodeInstance[];

  /**
   * A list of all the descendants NodeInstances, flattened in a single array
   */
  flatNodes: AjfNodeInstance[];
}

/**
 * A node instance containing an AjfRepeatingNode node.
 */
export interface AjfRepeatingNodeInstance extends AjfBaseNodeInstance {
  /**
   * The blueprint AjfRepeatingNode.
   */
  node: AjfRepeatingNode;

  /**
   * A formula that determines the number of repetitions calculated with the instance index.
   */
  formulaReps?: AjfFormula;

  /**
   * The numeric id of the current repetition.
   */
  reps: number;

  /**
   * True disable all slides eccept the last
   */
  disableRemoval?: boolean;

  /**
   * True if can add a new slide.
   */
  canAdd?: boolean;

  /**
   * True if can remove the current slide
   */
  canRemove?: boolean;
}

/**
 * A node instance containing an AjfRepeatingContainerNode node.
 */
export interface AjfBaseRepeatingContainerNodeInstance
  extends Omit<AjfContainerNodeInstance, 'node'>,
    Omit<AjfRepeatingNodeInstance, 'node'> {
  node: AjfRepeatingContainerNode;
}

/**
 * A repeating container instance containing an AjfNodeGroup node.
 */
export interface AjfNodeGroupInstance extends AjfBaseRepeatingContainerNodeInstance {
  node: AjfNodeGroup;
}

export type AjfRepeatingContainerNodeInstance = AjfNodeGroupInstance | AjfRepeatingSlideInstance;

export type AjfNodeInstance =
  | AjfContainerNodeInstance
  | AjfFieldInstance
  | AjfRepeatingNodeInstance
  | AjfRepeatingSlideInstance
  | AjfSlideInstance;
