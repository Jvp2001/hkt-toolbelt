import { Conditional, Type } from '..'

/**
 * Abstract class used for internal purposes.
 */
export abstract class _ {
  abstract readonly _: symbol
}

/**
 * `Expect` is a type-level function that checks if a type `X` equals a type `V`.
 * If `X` equals `V`, it returns `V`. If `X` does not equal `V`, it returns `V & _`.
 * If `V` is never, it returns `X`. If `X` is never, it returns `Expect<X, V>`.
 * The purpose of this function is to cause a compiler error to be emitted if the types are not equivalent.
 * 
 * @template X - The type to check.
 * @template V - The type to compare with. Default is `true`.
 * 
 * @example
 * type T0 = Expect<true> // true
 * type T1 = Expect<false> // false & _
 * type T2 = Expect<number, true> // true & _
 * type T3 = Expect<never, true> // Expect<never, true>
 */
export type Expect<
  X extends Conditional._$equals<X, V> extends true ? V : V & _,
  V = true
> = Type._$isNever<V> extends true
  ? X
  : Type._$isNever<X> extends true
  ? Expect<X, V>
  : X
