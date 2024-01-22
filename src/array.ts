export {}

/**
 * Extra Utilities on `Array`
 */
declare global {
  interface Array<T> {
    first(): T
    empty(): boolean
    notEmpty(): boolean
  }
}

Array.prototype.first = function <T>(): T {
  return this.at(0)
}

Array.prototype.empty = function (): boolean {
  return this.length === 0
}

Array.prototype.notEmpty = function (): boolean {
  return !this.empty()
}
