import { readFileSync } from "fs"

import { expect, test } from "vitest"

import { SgfTree } from "../sgf_tree"

test("1. Add a Node", () => {
  const sgfString = readFileSync(
    "./src/tests/sgf/2_two_branches.sgf",
    "utf-8"
  )

  const sgfTrees = SgfTree.parseSgf(sgfString)

  const newNode = new SgfTree({ B: "jj" }, [])

  sgfTrees.add(newNode, {
    down: 3,
    right: 2,
  })

  console.log(sgfTrees.toPrettyJsonString())

  const sgfStringAnswer = readFileSync(
    "./src/tests/sgf/7_two_branches_plus_one.sgf",
    "utf-8"
  )

  // expect(sgfTrees.toSgf()).to.equal(sgfStringAnswer)
})

// test("2. Remove a Node", () => {
//   const sgfString = readFileSync(
//     "./src/tests/sgf/5_nested_branches_2_levels.sgf",
//     "utf-8"
//   )

//   const sgfTrees = SgfTree.parseSgf(sgfString)

//   sgfTrees.children.first().remove({ down: 2, right: 1 })

//   expect("").to.equal("")
// })
