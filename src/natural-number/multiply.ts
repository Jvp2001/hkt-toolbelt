import { Type, Number, Kind, DigitList, NaturalNumber } from "..";

export type _$multiply<
  A extends Number.Number,
  B extends Number.Number,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<A>,
  B_LIST extends DigitList.DigitList = NaturalNumber._$toList<B>,
  PRODUCT_LIST extends DigitList.DigitList = DigitList._$multiply<
    A_LIST,
    B_LIST
  >,
  PRODUCT = DigitList._$toString<PRODUCT_LIST>
> = PRODUCT;

declare abstract class Multiply_T<A extends Number.Number> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Number.Number>
  ) => Number._$isNatural<typeof x> extends true
    ? _$multiply<A, typeof x>
    : never;
}

export declare abstract class Multiply extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Number.Number>
  ) => Number._$isNatural<typeof x> extends true ? Multiply_T<typeof x> : never;
}
