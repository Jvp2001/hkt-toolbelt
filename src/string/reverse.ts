import { Type, Kind } from '..'

/**
 * `String._$reverse` is a type-level function that reverses the order of characters in a string.
 * 
 * @template S - The string to reverse.
 * @template O - The reversed string (initially empty).
 * 
 * @example
 * type T0 = String._$reverse<'foo'> // 'oof'
 * type T1 = String._$reverse<''> // ''
 */
export type _$reverse<
  S extends string,
  O extends string = ''
> = S extends `${infer Head}${infer Tail}`
  ? _$reverse<Tail, `${Head}${O}`>
  : `${string extends S ? string : ''}${O}`

/**
 * `String.Reverse` is a type-level function that reverses the order of characters in a string.
 * 
 * @example
 * type T0 = $<String.Reverse, 'foo'> // 'oof'
 * type T1 = $<String.Reverse, ''> // ''
 */
export interface Reverse extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$reverse<typeof x>
}
