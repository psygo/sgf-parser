// TODO: This should be its own package.
export class SgfTree {
  constructor(
    // The pointer to the parent isn't really necessary, but
    // it makes parsing much easier.
    public parent?: SgfTree,
    public data: string = "",
    public children: SgfTree[] = []
  ) {}

  toJSON(): Object {
    return {
      data: this.data,
      children: this.children.map((c) => c.toJSON()),
    };
  }

  // TODO: Stringify method, to transform it back to SGF.
}
