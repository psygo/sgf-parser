export class SgfTree {
  constructor(
    public parent?: SgfTree,
    public data: string = "",
    public children: SgfTree[] = []
  ) {}

  toJSON(): Object {
    return {
      data: this.data,
      children: this.children.map((child) => child.toJSON()),
    }
  }
}

function parseSgf(sgf: string) {
  const trees = new SgfTree()
  let currentTree: SgfTree = trees
  let currentString: string = ""

  for (const char of sgf) {
    if (char === "(") {
      const newTree = new SgfTree(currentTree)
      currentTree.children.push(newTree)
      currentTree = newTree
    } else if (char === ")") {
      currentTree.data = currentString
      currentTree = currentTree.parent!
    } else {
      currentString += char
    }
  }

  return trees
}

const test1 =
  "(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.52.2]KM[6.5]SZ[19]DT[2023-12-25];B[pd];W[dd];B[pq];W[dp])"
const test2 =
  "(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.52.2]KM[6.5]SZ[19]DT[2023-12-25];B[pd];W[dd](;B[pq];W[dp])(;B[dp];W[pp]))"

const sgf = parseSgf(test2)

// console.log(sgf.children.length)
console.log(JSON.stringify(sgf.toJSON(), null, 2))
