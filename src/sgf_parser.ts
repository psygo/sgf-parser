import { SgfTree } from "./sgf_tree";

/**
 * An SGF tree is basically a *trie* data structure encoded
 * in text.
 */
export function parseSgf(sgf: string) {
  // 1. Cleanup
  sgf = sgf
    .replaceAll("\n", "")
    .replaceAll("\t", "")
    .replaceAll(" ", "")
    .trim();

  // 2. Initialization
  const trees = new SgfTree();
  let currentTree: SgfTree = trees;
  let currentString: string = "";

  // 3. Flattened Recursion
  for (const char of sgf) {
    switch (char) {
      case "(":
        // 3.1. Opening a Branch
        currentTree.data = currentString;
        const newTree = new SgfTree(currentTree);
        currentTree.children.push(newTree);
        currentTree = newTree;
        currentString = "";
        break;
      case ")":
        // 3.2. Closing the Current Branch and Going Back to the
        //      Parent.
        currentTree.data = currentString;
        currentTree = currentTree.parent!;
        currentString = currentTree.data;
        break;
      default:
        currentString += char;
    }
  }

  return trees.children;
}

function parseMovesAndMetadata(sgfData: string) {}

const test1 = `
  (
    ;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.52.2]KM[6.5]SZ[19]DT[2023-12-25]
    ;B[pd]
    ;W[dd]
    ;B[pq]
    ;W[dp]
  )
`;
const test2 = `
  (
    ;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.52.2]KM[6.5]SZ[19]DT[2023-12-25]
    ;B[pd]
    ;W[dd]
      (
        ;B[pq]
        ;W[dp]
      )
      (
        ;B[dp]
        ;W[pp]
      )
  )
`;
const test3 = `
  (
    ;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.52.2]KM[6.5]SZ[19]DT[2023-12-25]
    ;B[pd]
    ;W[dd]
      (
        ;B[pq]
        ;W[dp]
      )
      (
        ;B[dp]
        ;W[pp]
        ;PL[B]AE[jk]AB[jj]AW[ji]
        ;B[jq]
      )
  )
`;
const test4 = `
  (
    ;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.52.2]KM[6.5]SZ[19]DT[2023-12-25]
    ;B[pd]C[Comment on move.]
    ;W[dd]
      (
        ;B[pq]
        ;W[dp]
      )
      (
        ;B[dp]
        ;W[pp]
        ;PL[B]AE[jk]AB[jj]AW[ji]C[Comment on editing.]
        ;B[jq]
      )
  )
`;

const sgf = parseSgf(test4);
const sgfAsJSON = sgf.map((c) => c.toJSON());
const prettyPrintSgf = JSON.stringify(sgfAsJSON, null, 2);

console.log(prettyPrintSgf);
