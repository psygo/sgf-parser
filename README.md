# SGF Tree Parser

An SGF is basically a text encoding of a tree data structure, and its grammar is described [here](https://homepages.cwi.nl/~aeb/go/misc/sgf.html).

## Usage

```ts
import { SgfTree } from "../sgf_tree"

const sgfTree = SgfTree.parseSgf("...")
```

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
