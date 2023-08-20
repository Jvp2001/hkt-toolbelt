import { Kind, Type, Number } from '..'

export type _$max<
  A extends Number.Number,
  B extends Number.Number
> = Number._$compare<A, B> extends 1 ? A : B

interface Max_T<N extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$max<typeof x, N>
}

/**
 * `Number.Max` is a type-level function that returns the maximum of two numbers.
 *
 * @example
 * type T0 = $<Number.Max, 1> // 1
 * type T1 = $<Number.Max, 2> // 2
 */
export interface Max extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Max_T<typeof x>
}
