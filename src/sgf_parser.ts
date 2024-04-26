import "./array"

import { SgfTree } from "./sgf_tree"

// An SGF tree is basically a *trie* data structure encoded
// in text.
//
// I bet you could also do the whole parsing with only
// Regexes. (I think I'm gonna create a Stack Overflow
// question for this.)
export function parseSgf(sgf: string) {
  // 1. Cleanup
  sgf = sgf
    .trim()
    .replaceAll("\n", "")
    .replaceAll("\t", "")
    .replaceAll(" ", "")

  // 2. Initialization
  const trees = new SgfTree()
  let currentTree: SgfTree = trees
  let currentString: string = ""

  // 3. Flattened Recursion
  for (const char of sgf) {
    switch (char) {
      case "(":
        // 3.1. Opening a Branch
        currentTree.data = currentString
        const newTree = new SgfTree(currentTree)
        currentTree.children.push(newTree)
        currentTree = newTree
        currentString = ""
        break
      case ")":
        // 3.2. Closing the Current Branch and Going Back to the
        //      Parent.
        // parseMovesAndMetadata(currentString)
        currentTree.data = currentString
        currentTree = currentTree.parent!
        currentString = currentTree.data
        break
      default:
        currentString += char
    }
  }

  return trees.children
}

// TODO: Complete
function parseMovesAndMetadata(sgfData: string) {
  const metadataAndMoves = sgfData
    .split(";")
    .filter((m) => m !== "")

  const regex =
    /(?<key>[A-Z](?:\s*[A-Z])*)\[(?<value>(?:\\\]|[^\]])*)/g
  const matches = [...metadataAndMoves[0].matchAll(regex)]

  console.log(matches.first().groups!["value"])
}

// const sgfTrees = parseSgf(test5)
// sgfTrees.first().add(new SgfTree(undefined, ";B[jj]"), {
//   down: 2,
// })
// sgfTrees.first().remove({ down: 2, right: 1 })

// const sgfTreeAsJSON = sgfTrees.map((c) => c.toJson())
// const prettyPrintSgf = JSON.stringify(
//   sgfTreeAsJSON,
//   null,
//   2
// )

// const reSgf = sgfTrees
//   .map((c) => "(" + c.toSgf() + ")")
//   .join("")

// console.log(reSgf)
