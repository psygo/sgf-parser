import "./array"

export type SgfTreeStringArray =
  | string
  | string[]
  | SgfTreeStringArray[]

export type SgfTreeJson = {
  data: string
  children: SgfTreeJson[]
}

// TODO: Maybe I should make these 0 based...
export type TreeCoordinates = {
  /**
   * Bigger or equal than 1
   */
  down: number
  /**
   * Bigger or equal than 1.
   */
  right?: number
}

export class SgfTree {
  //--------------------------------------------------------

  constructor(
    // The pointer to the parent isn't really necessary, but
    // it makes parsing much easier. It's a circular
    // reference though.
    public parent?: SgfTree,
    public data: string = "",
    public children: SgfTree[] = []
  ) {}

  //--------------------------------------------------------
  // Changing the Tree

  /**
   * Checking if the coordinate is already occupied is *not*
   * an SGF responsibility, and thus won't be in here.
   *
   * This also pretty much assumes that the coordinates are
   * valid.
   */
  add(tree: SgfTree, coordinates: TreeCoordinates) {
    const parentRoot = this.getDownToParent(
      coordinates.down
    )

    parentRoot.children.push(
      new SgfTree(parentRoot, tree.data, tree.children)
    )
  }

  private getDownToParent(down: number) {
    let currentRoot: SgfTree = this
    const parentToTarget = down - 2

    for (let i = 0; i < parentToTarget; i++)
      currentRoot = this.children.first()

    return currentRoot
  }

  remove(coordinates: TreeCoordinates) {
    const parentRoot = this.getDownToParent(
      coordinates.down
    )

    const right = coordinates.right
    if (right) {
      parentRoot.children.splice(right - 1, 1)
    }
  }

  //--------------------------------------------------------
  // Parser

  static parseSgf(sgf: string) {
    // 1. Cleanup
    sgf = sgf
      .trim()
      .replaceAll("\n", "")
      .replaceAll("\t", "")
      .replaceAll(" ", "")

    // 2. Initialization
    const trees = new SgfTree()
    let currentTree: SgfTree = trees
    let currentString = ""

    // 3. Flattened Recursion
    for (const char of sgf) {
      switch (char) {
        // 3.1. Opening a Branch
        case "(":
          currentTree.data = currentString
          const newTree = new SgfTree(currentTree)
          currentTree.children.push(newTree)
          currentTree = newTree
          currentString = ""
          break
        // 3.2. Closing the Current Branch and Going Back to
        //      the Parent.
        case ")":
          // parseMovesAndMetadata(currentString)
          currentTree.data = currentString
          currentTree = currentTree.parent!
          currentString = currentTree.data
          break
        default:
          currentString += char
      }
    }

    return trees
  }

  private parseMovesAndMetadata(sgfData: string) {
    const metadataAndMoves = sgfData
      .split(";")
      .filter((m) => m !== "")

    const regex =
      /(?<key>[A-Z](?:\s*[A-Z])*)\[(?<value>(?:\\\]|[^\]])*)/g
    const matches = [...metadataAndMoves[0].matchAll(regex)]

    console.log(matches.first().groups!["value"])
  }

  //--------------------------------------------------------
  // `to` Methods

  toSgf(): string {
    return (
      this.data +
      (this.children.notEmpty()
        ? this.children
            .map((c) => c.toSgf())
            .reduce((p, c) => p + "(" + c + ")", "")
        : "")
    )
  }

  toJson(): SgfTreeJson {
    return {
      data: this.data,
      children: this.children.map((c) => c.toJson()),
    }
  }

  toArray(): SgfTreeStringArray[] {
    return [
      this.data,
      this.children.map((c) => c.toArray()),
    ]
  }

  //--------------------------------------------------------
}
