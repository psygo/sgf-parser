import './array'

export type Json = Object

// TODO: Maybe I should make these 0 based...
export type TreeCoordinates = {
  /**
   * Bigger or equal than 1
   */
  down: number
  /**
   * Bigger or equal than 1.
   */
  right?: number
}

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
    public data: string = '',
    public children: SgfTree[] = []
  ) {}

  /**
   * Checking if the coordinate is already occupied is *not*
   * an SGF responsibility, and thus won't be in here.
   *
   * This also pretty much assumes that the coordinates are
   * valid.
   */
  add(tree: SgfTree, coordinates: TreeCoordinates) {
    const parentRoot = this.getDownToParent(
      coordinates.down
    )

    parentRoot.children.push(
      new SgfTree(parentRoot, tree.data, tree.children)
    )
  }

  private getDownToParent(down: number) {
    let currentRoot: SgfTree = this
    const parentToTarget = down - 2

    for (let i = 0; i < parentToTarget; i++)
      currentRoot = this.children.first()

    return currentRoot
  }

  remove(coordinates: TreeCoordinates) {
    const parentRoot = this.getDownToParent(
      coordinates.down
    )

    const right = coordinates.right
    if (right) {
      parentRoot.children.splice(right - 1, 1)
    }
  }

  toSgf(): string {
    return (
      this.data +
      (this.children.notEmpty()
        ? this.children
            .map((c) => c.toSgf())
            .reduce((p, c) => p + '(' + c + ')', '')
        : '')
    )
  }

  toJson(): Json {
    return {
      data: this.data,
      children: this.children.map((c) => c.toJson()),
    }
  }
}
