export class SgfTree {
  constructor(
    public parent?: SgfTree,
    public data: string = "",
    public children: SgfTree[] = []
  ) {}

  toJSON(): Object {
    return {
      data: this.data,
      children: this.children.map((c) => c.toJSON()),
    };
  }
}

function parseSgf(sgf: string) {
  sgf = sgf
    .replaceAll("\n", "")
    .replaceAll("\t", "")
    .replaceAll(" ", "")
    .trim();

  const trees = new SgfTree();
  let currentTree: SgfTree = trees;
  let currentString: string = "";

  for (const char of sgf) {
    if (char === "(") {
      currentTree.data = currentString;
      const newTree = new SgfTree(currentTree);
      currentTree.children.push(newTree);
      currentTree = newTree;
      currentString = "";
    } else if (char === ")") {
      currentTree.data = currentString;
      currentTree = currentTree.parent!;
      currentString = currentTree.data;
    } else {
      currentString += char;
    }
  }

  return trees.children.map((c) => c.toJSON());
}

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

const sgf = parseSgf(test3);

console.log(JSON.stringify(sgf, null, 2));
