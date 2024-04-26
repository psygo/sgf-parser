import "./array"

import { SgfBranchString, type SgfString } from "./sgf"

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

  static parseSgf(sgf: SgfString) {
    return SgfTree.parseBranches(this.sgfCleanup(sgf))
  }

  private static sgfCleanup(sgf: SgfString) {
    return sgf
      .trim()
      .replaceAll("\n", "")
      .replaceAll("\t", "")
      .replaceAll(" ", "")
  }

  private static parseBranches(sgf: SgfString) {
    const trees = new SgfTree()
    let currentTree: SgfTree = trees
    let currentString = ""

    // Flattened Recursion
    for (const char of sgf) {
      switch (char) {
        // 1. Opening a Branch
        case "(":
          currentTree.data = currentString
          const newTree = new SgfTree(currentTree)
          currentTree.children.push(newTree)
          currentTree = newTree
          currentString = ""
          break
        // 2. Closing the Current Branch and Going Back to
        //    the Parent.
        case ")":
          currentTree.data = currentString
          this.parseBranch(currentTree)
          currentTree = currentTree.parent!
          currentString = currentTree.data
          break
        default:
          currentString += char
      }
    }

    return trees
  }

  private static parseBranch(tree: SgfTree) {
    const children = tree.children

    const nodesAsString = tree.data
      .split(";")
      .filter((m) => m !== "")

    tree.data = nodesAsString.first()
    const remaniningNodes = nodesAsString.slice(1)
    let currentTree = tree

    for (const nodeData of remaniningNodes) {
      const newChildren = new SgfTree(tree, nodeData)
      currentTree.children = [newChildren]

      currentTree = currentTree.children.first()
    }

    currentTree.children = children
  }

  //--------------------------------------------------------
  // `to` Methods

  toSgf(): string {
    if (!this.parent)
      return this.children
        .map((c) => "(;" + c.toSgf() + ")")
        .join()

    if (this.children.notEmpty()) {
      if (this.children.length === 1) {
        return (
          this.data + ";" + this.children.first().toSgf()
        )
      } else {
        return (
          this.data +
          this.children
            .map((c) => c.toSgf())
            .reduce((p, c) => p + "(;" + c + ")", "")
        )
      }
    } else {
      return this.data
    }
  }

  toJson(): SgfTreeJson {
    return {
      data: this.data,
      children: this.children.map((c) => c.toJson()),
    }
  }

  toPrettyJsonString(): string {
    return JSON.stringify(this.toJson(), null, 2)
  }

  toArray(): SgfTreeStringArray[] {
    return [
      this.data,
      this.children.map((c) => c.toArray()),
    ]
  }

  //--------------------------------------------------------
}
