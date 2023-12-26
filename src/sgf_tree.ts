export class SgfTree {
  constructor(
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
}
