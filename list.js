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

import h from "hastscript";
import raw from "hast-util-raw";

export default () => {
  return async (tree) => {
    // Parse raw nodes.
    tree = raw(tree);

    // Process any <ol> tags.
    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i];
      if (node.tagName === "ol") {
        let index = 1;
        for (let j = 0; j < node.children.length; j++) {
          const child = node.children[j];
          if (child.tagName === "li") {
            node.children[j] = Process(child, index++);
          }
        }
      }
    }

    return tree;
  };
};

function Process(li, index) {
  return h("li", [
    h("div", { class: "circle" }, index + ""),
    h("span", li.children),
  ]);
}
