import { $, Test, NaturalNumber } from "..";

type Divide_Spec = [
  /**
   * 0 / 0 = 0. The quotient is 0.
   */
  Test.Expect<$<$<NaturalNumber.Divide, 0>, 0>, 0>,

  /**
   * 10 / 2 = 5. The quotient is 5.
   */
  Test.Expect<$<$<NaturalNumber.Divide, 10>, 2>, 5>,

  /**
   * 123 / 17 results is 7.
   */
  Test.Expect<$<$<NaturalNumber.Divide, 123>, 17>, 7>,

  /**
   * 123 / 1 = 123. The quotient is 123.
   */
  Test.Expect<$<$<NaturalNumber.Divide, 123>, 1>, 123>,

  /**
   * 123 / 123 = 1. The quotient is 1.
   */
  Test.Expect<$<$<NaturalNumber.Divide, 123>, 123>, 1>,

  /**
   * 100 / 25 = 4.
   */
  Test.Expect<$<$<NaturalNumber.Divide, 100>, 25>, 4>,

  /**
   * 100 / 50 = 2.
   */
  Test.Expect<$<$<NaturalNumber.Divide, 100>, 50>, 2>,

  /**
   * 100 / 75 = 1.
   */
  Test.Expect<$<$<NaturalNumber.Divide, 100>, 75>, 1>,

  /**
   * 100 / 99 = 1.
   */
  Test.Expect<$<$<NaturalNumber.Divide, 100>, 99>, 1>,

  /**
   * Can perform complicated division.
   */
  Test.Expect<
    $<
      $<
        NaturalNumber.Divide,
        123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789n
      >,
      5
    >,
    24691357824691357824691357824691357824691357824691357824691357824691357824691357824691357n
  >
];