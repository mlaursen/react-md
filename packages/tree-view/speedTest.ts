import now from "performance-now";
import { IFlattenedTree, FlattenedTreeViewData } from "./src/types";
import buildTree from "./src/utils/buildTree";

const TEST_AMOUNT = 20;
const ROOT_LEVEL_NODES = 300;
const MAX_DEPTH = 5;
const MAX_ADDITIONAL_CHILDREN_AT_EACH_DEPTH = 20;
const MIN_ADDITIONAL_CHILDREN_AT_EACH_DEPTH = 0;

const flattenedTree: IFlattenedTree = {};

const randomInt = () =>
  Math.floor(Math.random() * MAX_ADDITIONAL_CHILDREN_AT_EACH_DEPTH) +
  MIN_ADDITIONAL_CHILDREN_AT_EACH_DEPTH;

function createChildItems(depth: number, parentId: string, additional: number = 0) {
  const itemId = `${parentId}-${depth}`;
  flattenedTree[itemId] = {
    itemId,
    parentId,
    children: itemId,
  };

  for (let i = 1; i <= additional; i++) {
    const itemId2 = `${parentId}-${i}`;
    flattenedTree[itemId2] = {
      itemId: itemId2,
      parentId,
      children: itemId2,
    };
  }

  if (depth < MAX_DEPTH) {
    createChildItems(depth + 1, itemId, randomInt());
  }
}

console.log(
  `Generating a random tree with at least ${ROOT_LEVEL_NODES} root nodes each with ${MAX_DEPTH} levels of children ` +
    `that can contain ${MIN_ADDITIONAL_CHILDREN_AT_EACH_DEPTH}-${MAX_ADDITIONAL_CHILDREN_AT_EACH_DEPTH} children`
);
for (let i = 0; i < ROOT_LEVEL_NODES; i++) {
  const itemId = `item-${i}`;
  flattenedTree[itemId] = {
    itemId,
    parentId: null,
    children: itemId,
  };
  createChildItems(1, itemId);
}

console.log("Created a tree with %d nodes", Object.values(flattenedTree).length);
console.log("Running the perf test %d times\n", TEST_AMOUNT);

let totalTime = 0;
let startTime = 0;
for (let i = 0; i < TEST_AMOUNT; i++) {
  console.time("buildTree");
  startTime = now();

  // doing Object.values each time since this is how it renders within the FlattenedTreeView
  buildTree(null, Object.values(flattenedTree));
  totalTime += now() - startTime;
  console.timeEnd("buildTree");
}

console.log("\nTotal time: %sms", totalTime.toFixed(3));
console.log("Average time: %sms", (totalTime / TEST_AMOUNT).toFixed(3));
