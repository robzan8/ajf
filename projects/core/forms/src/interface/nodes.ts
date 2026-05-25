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

import {AjfField} from './fields';
import {AjfRepeatingSlide} from './slides';
import {AjfSlide} from './slides';

/**
 * An enum containing all the available NodeTypes
 */
// tslint:disable-next-line:prefer-const-enum
export enum AjfNodeType {
  AjfField,
  AjfFieldNodeLink,
  AjfNodeGroup,
  AjfSlide,
  AjfRepeatingSlide,
  LENGTH,
}

/**
 * The base element of ajf forms (for example a slide or a field).
 * Can contain other nodes in a recursive nodes tree.
 */
export interface AjfBaseNode {
  /**
   * The node type
   */
  nodeType: AjfNodeType;

  /**
   * Node identification number
   */
  id: number;

  /**
   * Id of the parent node
   */
  parent: number;

  /**
   * The index of the condition in the conditionalBranches array of the parent node
   * that determines if the current branch should be followed.
   * (eg.
   *    parentNode.id = 1
   *    parentNode.conditionalBranches = ['x &gt; 1', 'x &lt;= 1', 'true'];
   *    myCurrentNode.parent = 1
   *    myCurrentNode.parentNode = 0;
   *
   * In this case, if the condition 'x &gt; 1' is met, the current branch will be followed ).
   */
  parentNode: number;

  /**
   * List of conditions that determines the branch to be followed
   */
  conditionalBranches: AjfCondition[];

  /**
   * The name of the field
   */
  name: string;

  /**
   * The label of the field
   */
  label: string;

  /**
   * AjfCondition for handling visibility
   */
  visibility?: AjfCondition;

  /**
   * AjfCondition for handling editability
   */
  readonly?: AjfCondition;
}

/**
 * Interface that is extended to represent a Repeating Node.
 * Repeating nodes are used any time a node can or must be repeated
 * N times, where N is the value of the "formulaReps" property.
 */
export interface AjfRepeatingNode extends AjfBaseNode {
  /**
   * Is the number of node repetition
   * Example: "opd_treatment == 'Yes' && ($groupReps || 1) || 0"
   */
  // TODO(peppedeka) WARNING: currently, formulaReps is NOT evaluated.
  // If formulaReps is set to any value, no repetition is allowed.
  // The number of possible repetitions is currently determined by maxReps (if set).
  formulaReps?: AjfFormula;

  /**
   *  Max number of repetitions
   */
  maxReps: number;

  /**
   *  Min number of repetitions
   */
  minReps: number;

  /**
   * If true show all slides of repeating node in readonly mode.
   * Except the last slide.
   * In the last slide remove button is always disabled and add button is enabled
   * only when the last slide is valid.
   */
  disableRemoval?: boolean;
}

/**
 * An AjfNode that contains other AjfNodes.
 */
export interface AjfContainerNode extends AjfBaseNode {
  /**
   * The children nodes
   */
  nodes: AjfNode[];
  // AjfCondition for handling field writable
  readonly?: AjfCondition;
}

/**
 * Interface representing a Repeating Node Group.
 * Repeating node groups are used any time the user is required to fill
 * the same node group N times, where N is the value of the "formulaReps" property.
 * (eg. N = number of children, then fill data for each of N children).
 */
export type AjfRepeatingContainerNode = AjfContainerNode & AjfRepeatingNode;

/**
 * Is a AjfRepeatingContainerNode of AjfNodeGroup
 */
export interface AjfNodeGroup extends AjfRepeatingContainerNode {
  nodeType: AjfNodeType.AjfNodeGroup;
}

/**
 * Used by the formBuilder.
 * Represents an empty slot in which to insert a new ajfNode.
 */
export interface AjfFieldNodeLink extends AjfBaseNode {
  nodeType: AjfNodeType.AjfFieldNodeLink;
}

export interface AjfUnknownNode extends AjfBaseNode {
  nodeType: AjfNodeType.LENGTH;
}

export type AjfNode =
  | AjfContainerNode
  | AjfField
  | AjfFieldNodeLink
  | AjfNodeGroup
  | AjfRepeatingNode
  | AjfRepeatingSlide
  | AjfRepeatingContainerNode
  | AjfSlide
  | AjfUnknownNode;
