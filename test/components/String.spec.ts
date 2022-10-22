import { String } from "../../src/components/String";
import { Test } from "../../src/components/Test";
import { $ } from "../../src/components/$";

type StartsWith_Spec = [
  /**
   * Prefixes should match correctly.
   */
  Test.Expect<$<String.StartsWith<"foo">, "foobar">>,

  /**
   * Two different strings should result in false.
   */
  Test.ExpectNot<$<String.StartsWith<"bar">, "foobar">>,

  /**
   * Non-empty strings start with "".
   */
  Test.Expect<$<String.StartsWith<"">, "foobar">>,

  /**
   * "" starts with "".
   */
  Test.Expect<$<String.StartsWith<"">, "">>,

  /**
   * "" does not start with non-empty strings.
   */
  Test.ExpectNot<$<String.StartsWith<"foo">, "">>,

  /**
   * Every string starts with a string.
   */
  Test.Expect<$<String.StartsWith<string>, "foobar">>,

  /**
   * "" starts with a string.
   */
  Test.Expect<$<String.StartsWith<string>, "">>,

  /**
   * Non-empty strings do not start with 'string'.
   */
  Test.ExpectNot<$<String.StartsWith<"foobar">, string>>,

  /**
   * Every string starts with "".
   */
  Test.Expect<$<String.StartsWith<"">, string>>
];

type EndsWith_Spec = [
  /**
   * Suffixes should match correctly.
   */
  Test.Expect<$<String.EndsWith<"bar">, "foobar">>,

  /**
   * Two different strings should result in false.
   */
  Test.ExpectNot<$<String.EndsWith<"foo">, "foobar">>,

  /**
   * Non-empty strings end with "".
   */
  Test.Expect<$<String.EndsWith<"">, "foobar">>,

  /**
   * "" end with "".
   */
  Test.Expect<$<String.EndsWith<"">, "">>,

  /**
   * "" does not end with non-empty strings.
   */
  Test.ExpectNot<$<String.EndsWith<"foo">, "">>,

  /**
   * Every string ends with a string.
   */
  Test.Expect<$<String.EndsWith<string>, "foobar">>,

  /**
   * "" ends with a string.
   */
  Test.Expect<$<String.EndsWith<string>, "">>,

  /**
   * Non-empty strings do not end with 'string'.
   */
  Test.ExpectNot<$<String.EndsWith<"foobar">, string>>,

  /**
   * Every string ends with "".
   */
  Test.Expect<$<String.EndsWith<"">, string>>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  Test.Expect<$<String.EndsWith<"">, number>>
];

type Includes_Spec = [
  /**
   * Can match on substrings.
   */
  Test.Expect<$<String.Includes<"oba">, "foobar">>,

  /**
   * Two different strings should result in false.
   */
  Test.ExpectNot<$<String.EndsWith<"qux">, "foobar">>,

  /**
   * Non-empty strings include the empty string.
   */
  Test.Expect<$<String.Includes<"">, "foobar">>,

  /**
   * "" includes "".
   */
  Test.Expect<$<String.Includes<"">, "">>,

  /**
   * "" does not include non-empty strings.
   */
  Test.ExpectNot<$<String.Includes<"foo">, "">>,

  /**
   * Every string includes a string.
   */
  Test.Expect<$<String.Includes<string>, "foobar">>,

  /**
   * "" includes a string.
   */
  Test.Expect<$<String.Includes<string>, "">>,

  /**
   * Non-empty strings do not include all strings.
   */
  Test.ExpectNot<$<String.Includes<"foobar">, string>>,

  /**
   * Every string includes a "".
   */
  Test.Expect<$<String.Includes<"">, string>>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  Test.Expect<$<String.Includes<"">, number>>
];
