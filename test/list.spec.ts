import $, {
  Conditional,
  Function,
  Kind,
  List,
  String,
  Test,
} from "hkt-toolbelt";

type Map_Spec = [
  /**
   * Map can execute conditionals over tuples.
   */
  Test.Expect<
    $<List.Map<Conditional.Equals<"foo">>, ["foo", "bar"]>,
    [true, false]
  >,

  /**
   * Empty input corresponds to empty output.
   */
  Test.Expect<$<List.Map<Conditional.Equals<"foo">>, []>, []>,

  /**
   * Non-tuple input emits a compiler error
   */
  // @ts-expect-error
  $<List.Map<Function.Identity>, number>,

  /**
   * Mapping over identity results in the same tuple.
   */
  Test.Expect<$<List.Map<Function.Identity>, ["foo", "bar"]>, ["foo", "bar"]>,

  /**
   * Mapping over constant results in a tuple solely composed of such elements.
   */
  Test.Expect<
    $<List.Map<Function.Constant<"foo">>, ["foo", "bar"]>,
    ["foo", "foo"]
  >
];

type Find_Spec = [
  /**
   * Can find a number present in a tuple.
   */
  Test.Expect<$<List.Find<Conditional.Equals<3>>, [1, 2, 3]>, 3>,

  /**
   * Searching for a non-existent element returns `never`.
   */
  Test.Expect<$<List.Find<Conditional.Equals<4>>, [1, 2, 3]>, never>,

  /**
   * Can find elements according to dynamic conditions.
   */
  Test.Expect<
    $<List.Find<Conditional.Extends<string>>, [1, 2, 3, "foo", "bar"]>,
    "foo"
  >,

  /**
   * Non-boolean returning find functions emit an error.
   */
  // @ts-expect-error
  List.Find<Function.Identity>
];

type Filter_Spec = [
  /**
   * Can filter specific elements in a tuple.
   */
  Test.Expect<$<List.Filter<Conditional.Equals<3>>, [1, 2, 3, 3]>, [3, 3]>,

  /**
   * Can perform dynamic subtype checks.
   */
  Test.Expect<
    $<List.Filter<Conditional.Extends<string>>, [1, "f", 2, "g", 3]>,
    ["f", "g"]
  >,

  /**
   * Filtering an empty tuple results in an empty tuple.
   */
  Test.Expect<$<List.Filter<Function.Constant<true>>, []>, []>,

  /**
   * Filtering with a constant true condition results in the same tuple.
   */
  Test.Expect<$<List.Filter<Function.Constant<true>>, [1, 2, 3]>, [1, 2, 3]>,

  /**
   * Filtering with a constant false condition results in the empty tuple.
   */
  Test.Expect<$<List.Filter<Function.Constant<false>>, [1, 2, 3]>, []>,

  /**
   * Non-boolean returning filter functions emit an error.
   */
  // @ts-expect-error
  List.Filter<Function.Constant<number>>,

  /**
   * Non-kind filter parameters result in a compilation error.
   */
  // @ts-expect-error
  List.Filter<number>,

  /**
   * Values can be applied to a filter function using Apply.
   */
  Test.Expect<
    $<Kind.Apply<[1, "foo", 2, 3]>, List.Filter<Conditional.Extends<number>>>,
    [1, 2, 3]
  >
];

type Includes_Spec = [
  /**
   * Can determine existence of elements in a tuple
   */
  Test.Expect<$<List.Includes<Conditional.Equals<3>>, [1, 2, 3]>>,

  /**
   * Can determine non-existence of elements in a tuple
   */
  Test.ExpectNot<$<List.Includes<Conditional.Equals<4>>, [1, 2, 3]>>,

  /**
   * Empty tuples always result in false on search.
   */
  Test.ExpectNot<$<List.Includes<Function.Constant<true>>, []>>,

  /**
   * Setting a constant inclusion function results in true for non-empty tuples.
   */
  Test.Expect<$<List.Includes<Function.Constant<true>>, [1, 2, 3]>>,

  /**
   * Setting a constant-false inclusion function results in false.
   */
  Test.ExpectNot<$<List.Includes<Function.Constant<false>>, [1, 2, 3]>>,

  /**
   * Can perform complex multidimensional filtering. In this example, select
   * only tuples that contain at least one string.
   */
  Test.Expect<
    $<
      List.Filter<List.Includes<Conditional.Extends<string>>>,
      [[1, 2, 3], [1, 2, 3, "f"], ["a", "b", "c"]]
    >,
    [[1, 2, 3, "f"], ["a", "b", "c"]]
  >,

  /**
   * Non-boolean inclusion check emit an error.
   */
  // @ts-expect-error
  List.Includes<Function.Constant<number>>,

  /**
   * Applying data that doesn't match the predicate input type emits an error.
   */
  // @ts-expect-error
  $<List.Includes<String.StartsWith<"foo">>, [1, 2, 3]>,

  /**
   * Applying includes to a non-tuple results in an error.
   */
  // @ts-expect-error
  $<List.Includes<Function.Constant<true>>, number>
];

type Append_Spec = [
  /**
   * Can append items.
   */
  Test.Expect<$<List.Push<4>, [1, 2, 3]>, [1, 2, 3, 4]>,

  /**
   * Will emit an error if applied to a non-tuple.
   */
  // @ts-expect-error
  $<List.Push<4>, number>
];

type Unshift_Spec = [
  /**
   * Can prepend items.
   */
  Test.Expect<$<List.Unshift<1>, [2, 3, 4]>, [1, 2, 3, 4]>,

  /**
   * Will emit an error if applied to a non-tuple.
   */
  // @ts-expect-error
  $<List.Unshift<4>, number>
];

type First_Spec = [
  /**
   * Can get the first element of a tuple.
   */
  Test.Expect<$<List.First, [1, 2, 3]>, 1>,

  /**
   * The first element of an empty tuple is never.
   */
  Test.Expect<$<List.First, []>, never>,

  /**
   * The first element of a variadic tuple is correct.
   */
  Test.Expect<$<List.First, [1, 2, 3, ...number[]]>, 1>,

  /**
   * Will emit an error if applied to a non-tuple.
   */
  // @ts-expect-error
  $<List.First, number>
];

type Last_Spec = [
  /**
   * Can extract the last element of a tuple.
   */
  Test.Expect<$<List.Last, [1, 2, 3]>, 3>,

  /**
   * The last element of an empty tuple is never.
   */
  Test.Expect<$<List.Last, []>, never>,

  /**
   * The last element of a tuple of indeterminate length is the underlying type.
   */
  Test.Expect<$<List.Last, number[]>, number>,

  /**
   * When the last element of a tuple is variadic, the last element found is the
   * underlying type under the variadic.
   */
  Test.Expect<$<List.Last, [string, ...number[]]>, number>,

  /**
   * When there are elements after a variadic type, the last such element is
   * selected as the last element.
   */
  Test.Expect<$<List.Last, [string, ...number[], "foo"]>, "foo">,

  /**
   * The last element of a one-tuple is the one element.
   */
  Test.Expect<$<List.Last, [string]>, string>
];

type Pair_Spec = [
  /**
   * Can generate a tuple of pairs from a tuple, where each element is paired
   * with the next element.
   */
  Test.Expect<$<List.Pair, [1, 2, 3, 4]>, [[1, 2], [2, 3], [3, 4]]>,

  /**
   * The pair of an empty tuple is an empty tuple.
   */
  Test.Expect<$<List.Pair, []>, []>,

  /**
   * The pair of a one-tuple is an empty tuple.
   */
  Test.Expect<$<List.Pair, [1]>, []>,

  /**
   * The pair of a two-tuple is a one-tuple.
   */
  Test.Expect<$<List.Pair, [1, 2]>, [[1, 2]]>,

  /**
   * The pair of a tuple of indeterminate length is a tuple of pairs of
   * indeterminate length.
   */
  Test.Expect<$<List.Pair, number[]>, [number, number][]>,

  /**
   * When a variadic is introduced in a pair, it fuzzes the type of the pair.
   */
  Test.Expect<
    $<List.Pair, [string, ...number[]]>,
    [string | number, string | number][]
  >
];

type Every_Spec = [
  /**
   * Can determine if every element in a tuple satisfies a predicate.
   */
  Test.Expect<$<List.Every<Conditional.Extends<number>>, [1, 2, 3]>>,

  /**
   * Can determine if every element in a tuple does not satisfy a predicate.
   */
  Test.ExpectNot<$<List.Every<Conditional.Extends<number>>, [1, 2, 3, "x"]>>,

  /**
   * Emits an error if the predicate does not return a boolean.
   */
  // @ts-expect-error
  $<List.Every<Function.Constant<number>>, [1, 2, 3]>,

  /**
   * Emits an error if the predicate input type does not match the tuple type.
   */
  // @ts-expect-error
  $<List.Every<String.StartsWith<"foo">>, [1, 2, 3]>,

  /**
   * Emits an error if the provided tuple elements do not match the predicate.
   */
  // @ts-expect-error
  $<List.Every<String.StartsWith<"foo">>, [1, 2, 3]>
];

type Some_Spec = [
  /**
   * Can determine if some element in a tuple satisfies a predicate.
   */
  Test.Expect<$<List.Some<Conditional.Extends<number>>, [1, 2, 3, "x"]>>,

  /**
   * Can determine if some element in a tuple does not satisfy a predicate.
   */
  Test.ExpectNot<$<List.Some<Conditional.Extends<number>>, ["x", "y", "z"]>>,

  /**
   * Always returns false for an empty tuple.
   */
  Test.ExpectNot<$<List.Some<Conditional.Extends<number>>, []>>,

  /**
   * Emits an error if the predicate does not return a boolean.
   */
  // @ts-expect-error
  $<List.Some<Function.Constant<number>>, [1, 2, 3]>,

  /**
   * For all predicates, an empty tuple is false.
   */
  Test.ExpectNot<$<List.Some<Conditional.Extends<number>>, []>>,

  /**
   * Emits an error if the predicate input type does not match the tuple type.
   */
  // @ts-expect-error
  $<List.Some<String.StartsWith<"foo">>, [1, 2, 3]>,

  /**
   * Emits an error if the provided tuple elements do not match the predicate.
   */
  // @ts-expect-error
  $<List.Some<String.StartsWith<"foo">>, [1, 2, 3]>
];

type Reverse_Spec = [
  /**
   * Can reverse a tuple.
   */
  Test.Expect<$<List.Reverse, [1, 2, 3]>, [3, 2, 1]>,

  /**
   * The reverse of the empty tuple is the empty tuple.
   */
  Test.Expect<$<List.Reverse, []>, []>,

  /**
   * Can reverse a tuple of indeterminate length.
   */
  Test.Expect<$<List.Reverse, number[]>, number[]>,

  /**
   * Can reverse a tuple with a variadic.
   */
  Test.Expect<$<List.Reverse, [1, 2, 3, ...number[]]>, [...number[], 3, 2, 1]>,

  /**
   * Can reverse a tuple with a variadic and elements following the variadic.
   */
  Test.Expect<
    $<List.Reverse, [1, 2, 3, ...number[], "foo"]>,
    ["foo", ...number[], 3, 2, 1]
  >
];

type IsVariadic_Spec = [
  /**
   * Can determine if a tuple is variadic.
   */
  Test.Expect<$<List.IsVariadic, [1, 2, 3, ...number[]]>>,

  /**
   * Can determine if a tuple is not variadic.
   */
  Test.ExpectNot<$<List.IsVariadic, [1, 2, 3]>>,

  /**
   * Can determine if a tuple of indeterminate length is variadic.
   */
  Test.Expect<$<List.IsVariadic, number[]>>,

  /**
   * Emits an error if the tuple is not a tuple.
   */
  // @ts-expect-error
  $<List.IsVariadic, number>
];
