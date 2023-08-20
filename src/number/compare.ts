import { Type, Number, Kind, Digit, DigitList, NaturalNumber } from '..'

type _$compare2<
  /**
   * The first number to compare.
   */
  A extends Number.Number,
  /**
   * The second number to compare.
   */
  B extends Number.Number,
  /**
   * The sign of the first number. This is either '+' or '-'.
   */
  A_SGN extends '+' | '-' = Number._$sign<A>,
  /**
   * The sign of the second number. This is either '+' or '-'.
   */
  B_SGN extends '+' | '-' = Number._$sign<B>,
  /**
   * The absolute value of the first number.
   */
  A_ABS extends Number.Number = Number._$absolute<A>,
  /**
   * The absolute value of the second number.
   */
  B_ABS extends Number.Number = Number._$absolute<B>,
  /**
   * The integer part of the first number as a digit list.
   */
  A_INT extends DigitList.DigitList = `${A_ABS}` extends `${infer INT extends
    Number.Number}.${string}`
    ? NaturalNumber._$toList<INT>
    : NaturalNumber._$toList<A_ABS>,
  /**
   * The integer part of the second number as a digit list.
   */
  B_INT extends DigitList.DigitList = `${B_ABS}` extends `${infer INT extends
    Number.Number}.${string}`
    ? NaturalNumber._$toList<INT>
    : NaturalNumber._$toList<B_ABS>,
  /**
   * The decimal part of the first number as a digit list.
   */
  A_DEC extends
    DigitList.DigitList = `${A}` extends `${string}.${infer DEC extends string}`
    ? DigitList._$fromString2<DEC>
    : [Digit.Zero],
  /**
   * The decimal part of the second number as a digit list.
   */
  B_DEC extends
    DigitList.DigitList = `${B}` extends `${string}.${infer DEC extends string}`
    ? DigitList._$fromString2<DEC>
    : [Digit.Zero],
  /**
   * The result of the comparison. This is 1 if `A` is greater than `B`, 0 if `A` is equal to `B`, and -1 if `A` is less than `B`.
   */
  RESULT extends 1 | 0 | -1 = A_SGN extends '+'
    ? B_SGN extends '+'
      ? A_INT extends B_INT
        ? _$decimalCompare<A_DEC, B_DEC>
        : DigitList._$compare<A_INT, B_INT>
      : 1
    : B_SGN extends '+'
    ? -1
    : A_INT extends B_INT
    ? _$decimalCompare<B_DEC, A_DEC>
    : DigitList._$compare<B_INT, A_INT>
> = RESULT

type _$decimalCompare<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList,
  A_FIRST extends Digit.Digit = DigitList._$first<A>,
  B_FIRST extends Digit.Digit = DigitList._$first<B>,
  A_NEXT extends DigitList.DigitList = DigitList._$shift<A>,
  B_NEXT extends DigitList.DigitList = DigitList._$shift<B>,
  COMP extends 1 | 0 | -1 = Digit._$compare<A_FIRST, B_FIRST>,
  RESULT extends 1 | 0 | -1 = A extends []
    ? B extends []
      ? 0
      : -1
    : B extends []
    ? 1
    : COMP extends 0
    ? _$decimalCompare<A_NEXT, B_NEXT>
    : COMP
> = RESULT

/**
 * `_$compare` is a type-level function that takes in
 * two number types `A` and `B`, and returns the comparison result as a number type.
 * The result will be 1 if `A` is greater than `B`,
 * 0 if `A` is equal to `B`, and -1 if `A` is less than `B`.
 *
 * @param A - A number type.
 * @param B - A number type.
 *
 * @example
 * For example, we can use `_$compare` to compare two numbers.
 *
 * ```ts
 * import { Number } from "hkt-toolbelt";
 *
 * type Result1 = Number._$compare<123, -321>; // 1
 * type Result2 = Number._$compare<-123, 321>; // -1
 * ```
 *
 * We can also use the `Compare` higher-order type with the `$` type-level
 * applicator to achieve the same result:
 *
 * ```ts
 * import { $, Number } from "hkt-toolbelt";
 *
 * type Result1 = $<$<Number.Compare, 123>, -321>; // 1
 * type Result2 = $<$<Number.Compare, -123>, 321>; // -1
 * ```
 */
export type _$compare<
  A extends Number.Number,
  B extends Number.Number,
  RESULT extends 1 | 0 | -1 = _$compare2<A, B>
> = RESULT

interface Compare_T<X extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$compare<X, typeof x>
}

/**
 * `Compare` is a type-level function that takes in
 * two number types `A` and `B`, and returns the comparison result as a number type.
 * The result will be 1 if `A` is greater than `B`,
 * 0 if `A` is equal to `B`, and -1 if `A` is less than `B`.
 *
 * @param A - A number type.
 * @param B - A number type.
 *
 * @example
 * For example, we can use `Compare` to compare two numbers.
 *
 * ```ts
 * import { $, Number } from "hkt-toolbelt";
 *
 * type Result1 = $<$<Number.Compare, 123>, -321>; // 1
 * type Result2 = $<$<Number.Compare, -123>, 321>; // -1
 * ```
 */
export interface Compare extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Compare_T<typeof x>
}
