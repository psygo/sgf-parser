import { readFileSync } from "fs"

import { expect, test } from "vitest"

import { SgfTree } from "../sgf_tree"

test("1. Add a Node", () => {
  const sgfString = readFileSync(
    "./src/tests/sgf/1_one_branch.sgf",
    "utf-8"
  )

  const sgfTrees = SgfTree.parseSgf(sgfString)

  sgfTrees.add(new SgfTree({ B: "jj" }, []), {
    down: 2,
  })

  console.log(sgfString)
  console.log(sgfTrees.toPrettyJsonString())
  console.log(sgfTrees.toSgf())

  expect("").to.equal("")
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
