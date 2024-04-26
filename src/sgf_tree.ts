import "./array"

import { SgfProperties, type SgfString } from "./sgf"

export type SgfTreeStringArray =
  | string
  | string[]
  | SgfTreeStringArray[]

export type SgfTreeJson = {
  data: SgfProperties
  dataAsString: string
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
    public data: SgfProperties = {},
    public children: SgfTree[] = [],
    private parent?: SgfTree,
    private dataAsString: string = ""
  ) {
    if (data && dataAsString === "")
      this.dataAsString = SgfTree.nodeDataToString(data)
    else if (dataAsString !== "")
      this.data = SgfTree.parseNodeData(dataAsString)
  }

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
      new SgfTree(
        {},
        tree.children,
        parentRoot,
        tree.dataAsString
      )
    )
  }

  private getDownToParent(down: number) {
    let currentRoot: SgfTree = this
    const parentToTarget = down + 1

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
          currentTree.dataAsString = currentString
          const newTree = new SgfTree(
            {},
            [],
            currentTree,
            ""
          )
          currentTree.children.push(newTree)
          currentTree = newTree
          currentString = ""
          break
        // 2. Closing the Current Branch and Going Back to
        //    the Parent.
        case ")":
          currentTree.dataAsString = currentString
          this.parseBranch(currentTree)
          currentTree = currentTree.parent!
          currentString = currentTree.dataAsString
          break
        default:
          currentString += char
      }
    }

    return trees
  }

  private static parseBranch(tree: SgfTree) {
    const children = tree.children

    const nodesAsString = tree.dataAsString
      .split(";")
      .filter((m) => m !== "")

    tree.dataAsString = nodesAsString.first()
    const remaniningNodes = nodesAsString.slice(1)
    let currentTree = tree

    for (const nodeDataAsString of remaniningNodes) {
      const newChildren = new SgfTree(
        this.parseNodeData(nodeDataAsString),
        [],
        tree,
        nodeDataAsString
      )
      currentTree.children = [newChildren]

      currentTree = currentTree.children.first()
    }

    currentTree.children = children
  }

  private static parseNodeData(nodeDataAsString: string) {
    const splitData = this.splitBrackets(nodeDataAsString)
    let currentKey = splitData.first()
    const nodeData: SgfProperties = {}

    for (const c of splitData) {
      if (c.includes("[")) {
        const newDatum = c.slice(1)
        if (nodeData[currentKey]) {
          if (typeof nodeData[currentKey] === "string")
            nodeData[currentKey] = [
              nodeData[currentKey] as string,
              newDatum,
            ]
          else
            nodeData[currentKey] =
              nodeData[currentKey].concat(newDatum)
        } else {
          nodeData[currentKey] = newDatum
        }
      } else {
        currentKey = c
      }
    }

    return nodeData
  }

  private static splitBrackets(s: string) {
    const split: string[] = []
    let currentString = ""

    for (const c of s) {
      switch (c) {
        case "[":
          split.push(currentString)
          currentString = "["
          break
        case "]":
          split.push(currentString)
          currentString = ""
          break
        default:
          currentString += c
      }
    }

    return split
  }

  private static nodeDataToString(sgfProps: SgfProperties) {
    return Object.entries(sgfProps)
      .map(([k, v]) => `${k}[${v}]`)
      .reduce((p, v) => p + v, "")
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
          this.dataAsString +
          ";" +
          this.children.first().toSgf()
        )
      } else {
        return (
          this.dataAsString +
          this.children
            .map((c) => c.toSgf())
            .reduce((p, c) => p + "(;" + c + ")", "")
        )
      }
    } else {
      return this.dataAsString
    }
  }

  toJson(): SgfTreeJson {
    return {
      data: this.data,
      dataAsString: this.dataAsString,
      children: this.children.map((c) => c.toJson()),
    }
  }

  toPrettyJsonString(): string {
    return JSON.stringify(this.toJson(), null, 2)
  }

  toArray(): SgfTreeStringArray[] {
    return [
      this.dataAsString,
      this.children.map((c) => c.toArray()),
    ]
  }

  //--------------------------------------------------------
}
