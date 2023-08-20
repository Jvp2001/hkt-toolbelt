import { Kind, Type, Function } from '..'

/**
 * `_$inferred` is a type that represents the most specific type of a value.
 */
type _$inferred =
  | string
  | number
  | boolean
  | undefined
  | null
  | Function.Function
  | Kind.Kind
  | _$inferredTuple
  | {
      [key: string]: _$inferred
    }

type _$inferredTuple = _$inferred[] | ReadonlyArray<_$inferred>

/**
 * `_$infer` is a type-level function that infers the most specific type of a value.
 * 
 * @template X - The value to infer the type of.
 * 
 * @example
 * type T0 = _$infer<'foo'> // 'foo'
 */
export type _$infer<
  X,
  Narrow = Type._$cast<X, _$inferred> | [...Type._$cast<X, _$inferredTuple>]
> = Narrow extends unknown[] ? { [key in keyof X]: _$infer<X[key]> } : Narrow

/**
 * `Infer` is a type-level function that infers the most specific type of a value.
 * 
 * @template X - The value to infer the type of.
 * 
 * @example
 * type T0 = $<Infer, 'foo'> // 'foo'
 */
export interface Infer extends Kind.Kind {
  f(x: this[Kind._]): _$infer<typeof x>
}
