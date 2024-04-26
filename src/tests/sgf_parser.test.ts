import { readFileSync } from "fs"

import { expect, test } from "vitest"

import { SgfTree } from "../sgf_tree"

test("1. Straight SGF with 1 branch and 4 nodes", () => {
  const sgfString = readFileSync(
    "./sgf/1_one_branch.sgf",
    "utf-8"
  )

  const sgfTrees = SgfTree.parseSgf(sgfString)

  expect(sgfTrees.toSgf()).to.equal(sgfString)
})

test("2. 2 Branches", () => {
  const sgfString = readFileSync(
    "./sgf/2_two_branches.sgf",
    "utf-8"
  )

  const sgfTrees = SgfTree.parseSgf(sgfString)

  expect(sgfTrees.toSgf()).to.equal(sgfString)
})

test("3. 2 Branches + Added (Edited) Stones", () => {
  const sgfString = readFileSync(
    "./sgf/3_two_branches_added_stones.sgf",
    "utf-8"
  )

  const sgfTrees = SgfTree.parseSgf(sgfString)

  expect(sgfTrees.toSgf()).to.equal(sgfString)
})

test("4. 2 Branches + Added (Edited) Stones + Comments", () => {
  const sgfString = readFileSync(
    "./sgf/4_two_branches_added_stones_comments.sgf",
    "utf-8"
  )

  const sgfTrees = SgfTree.parseSgf(sgfString)

  expect(sgfTrees.toSgf()).to.equal(sgfString)
})

test("5. Nested Branches in 2 levels", () => {
  const sgfString = readFileSync(
    "./sgf/5_nested_branches_2_levels.sgf",
    "utf-8"
  )

  const sgfTrees = SgfTree.parseSgf(sgfString)

  expect(sgfTrees.toSgf()).to.equal(sgfString)
})

test("6. Test 5 + Another Branch after the 2nd move", () => {
  const sgfString = readFileSync(
    "./sgf/6_test_5_plus_another_branch_after_2nd_move.sgf",
    "utf-8"
  )

  const sgfTrees = SgfTree.parseSgf(sgfString)

  expect(sgfTrees.toSgf()).to.equal(sgfString)
})
