# SGF Tree Parser

An SGF is basically a text encoding of a tree data structure, and its grammar is described [here](https://homepages.cwi.nl/~aeb/go/misc/sgf.html).

## Usage

Basic parsing:

```ts
import { SgfTree } from "../sgf_tree"

const sgfTree = SgfTree.parseSgf("...")
```

The tree's type is equivalent to this type in the end:

```ts
type SgfTree = {
  data: SgfProperties
  children: SgfTree[]
}
```

Some useful methods:

```ts
tree.toSgf()
tree.toJson()
tree.toPrettyJsonString()
tree.toArray()
```

Typical SGF tree operations:

```ts
const newNode = new SgfTree({ B: "jj" }, [])

sgfTrees.add(newNode, {
  down: 3,
  right: 3,
})

sgfTrees.remove({ down: 3, right: 2 })

sgfTrees.shift({ down: 3, right: 3 }, true)
```

You can find out more about how to use these methods from the test files.

## References

- [Go Pattern Search](https://github.com/psygo/go_pattern_search?tab=readme-ov-file)
- [Sabaki's SGF Parser](https://github.com/SabakiHQ/sgf)
- SGF Docs
  - [Red Bean - SGF](https://www.red-bean.com/sgf/)
  - [CWI - SGF Format](https://homepages.cwi.nl/~aeb/go/misc/sgf.html)
- [Stack Overflow - How to Parse SGF Metadata with JS Regexes](https://stackoverflow.com/q/77717462/4756173)
- [Stack Overflow - Recursive Regex for Parsing SGF with JS](https://stackoverflow.com/q/77718740/4756173)
- [Peg.js - A package for parsing any grammar](https://pegjs.org/)
- [LaTeX Stack Exchange - Parsing the Main Branch of Single-Branched SGF Files (with Regex?)](https://tex.stackexchange.com/a/709698/64441)
