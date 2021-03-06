/*
 * Copyright 2020 Nicolo John Davis
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import u from "unist-builder";
import visit from "unist-util-visit";
import toHTML from "hast-util-to-html";

/**
 * Undoes the effect of rehype-raw.
 */
export default () => {
  return async (tree) => {
    let svelteNodes = [];

    visit(tree, "element", async (node, i, parent) => {
      if (IsSvelteNode(node)) {
        svelteNodes.push({
          node,
          i,
          parent,
        });
      }
    });

    svelteNodes.forEach(Process);

    return tree;
  };
};

function IsSvelteNode(node) {
  if (node.tagName === "editor") return true;
  if (node.tagName === "expression") return true;
  if (node.tagName === "root") return true;
  if (node.tagName === "property") return true;
  if (node.tagName === "action") return true;
  return false;
}

function Process({ node, i, parent }) {
  if (!IsSvelteNode(node)) {
    return;
  }

  const nodeName = node.tagName.charAt(0).toUpperCase() + node.tagName.slice(1);

  let attrs = [];
  for (const key in node.properties) {
    const value = node.properties[key];
    attrs.push(`${key}=${value}`);
  }

  for (let i = 0; i < node.children.length; i++) {
    Process({ node: node.children[i], i, parent: node });
  }

  const attrsStr = attrs.join(" ");
  const t =
    `<${nodeName} ${attrsStr}>` +
    toHTML(node.children, { allowDangerousHtml: true }) +
    `</${nodeName}>`;

  parent.children[i] = u("raw", t);
}
