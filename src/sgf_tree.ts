export type Json = Object

// TODO: This should be its own package.
// TODO: Since it uses a circular reference (`parent`),
//       maybe then this should be just an intermediate
//       tree.
export class SgfTree {
  constructor(
    // The pointer to the parent isn't really necessary, but
    // it makes parsing much easier. It's a circular
    // reference though.
    public parent?: SgfTree,
    public data: string = "",
    public children: SgfTree[] = []
  ) {}

  toJson(): Json {
    return {
      data: this.data,
      children: this.children.map((c) => c.toJson()),
    }
  }

  // TODO: Stringify method, to transform it back to SGF.
  toSgf(): string {
    return (
      this.data +
      (this.children.length > 0
        ? "(" +
          this.children
            .map((c) => c.toSgf())
            .reduce((p, c) => p + c, "") +
          ")"
        : "")
    )
  }
}
