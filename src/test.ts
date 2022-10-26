import { Conditional } from ".";

type IsNever<X> = Conditional._$equals<X, never>;

abstract class _ {
  abstract readonly _: symbol;
}

export type Expect<
  X extends Conditional._$equals<X, V> extends true ? V : V & _,
  V = true
> = IsNever<V> extends true ? X : IsNever<X> extends true ? Expect<X, V> : X;

export type ExpectNot<
  X extends Conditional._$equals<X, V> extends true ? V : V & _,
  V = false
> = IsNever<V> extends true ? X : IsNever<X> extends true ? ExpectNot<X, V> : X;

export * as Test from "./test";

type Foo = never extends number ? true : false;
