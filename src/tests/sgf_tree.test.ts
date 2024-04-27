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
    right: 3,
  })

  const sgfStringAnswer = readFileSync(
    "./src/tests/sgf/7_two_branches_plus_one.sgf",
    "utf-8"
  )

  expect(sgfTrees.toSgf()).to.equal(sgfStringAnswer)
})

test("2. Remove a Node", () => {
  const sgfString = readFileSync(
    "./src/tests/sgf/7_two_branches_plus_one.sgf",
    "utf-8"
  )

  const sgfTrees = SgfTree.parseSgf(sgfString)

  sgfTrees.remove({ down: 3, right: 2 })

  const sgfStringAnswer = readFileSync(
    "./src/tests/sgf/8_three_branches_minus_one.sgf",
    "utf-8"
  )

  expect(sgfTrees.toSgf()).to.equal(sgfStringAnswer)
})

test("3. Shift a Branch", () => {
  const sgfString = readFileSync(
    "./src/tests/sgf/7_two_branches_plus_one.sgf",
    "utf-8"
  )

  const sgfTrees = SgfTree.parseSgf(sgfString)

  sgfTrees.shift({ down: 3, right: 3 }, true)

  const sgfStringAnswer = readFileSync(
    "./src/tests/sgf/9_three_branches_shifted.sgf",
    "utf-8"
  )

  expect(sgfTrees.toSgf()).to.equal(sgfStringAnswer)
})
