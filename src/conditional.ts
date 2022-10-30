import { Kind } from ".";

export type _$equals<T, U> = [T, U] extends [U, T] ? true : false;

export abstract class Equals<T> extends Kind {
  abstract f: (x: this[Kind._]) => _$equals<T, typeof x>;
}

export type _$extends<Super, X> = (X extends unknown ? X : never) extends Super
  ? true
  : false;

export abstract class Extends<Super> extends Kind {
  abstract f: (x: this[Kind._]) => _$extends<Super, typeof x>;
}

/**
 * @alias `Extends<T>`
 * @deprecated
 */
export abstract class SubtypeOf<Super> extends Kind {
  abstract f: (x: this[Kind._]) => _$extends<Super, typeof x>;
}

export * as Conditional from "./conditional";
