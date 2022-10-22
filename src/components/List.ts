import $, { Kind, Cast } from "hkt-toolbelt";

export declare namespace List {
  export type _$map<F extends Kind, X extends unknown[]> = {
    [key in keyof X]: $<F, X[key]>;
  };

  export abstract class Map<F extends Kind> extends Kind {
    abstract f: (x: Cast<this[Kind._], unknown[]>) => _$map<F, typeof x>;
  }

  export type _$find<F extends Kind, X extends unknown[]> = X extends [
    infer Head,
    ...infer Tail
  ]
    ? $<F, Head> extends true
      ? Head
      : _$find<F, Tail>
    : never;

  export abstract class Find<F extends Kind> extends Kind {
    abstract f: (x: Cast<this[Kind._], unknown[]>) => _$find<F, typeof x>;
  }

  export type _$filter<F extends Kind, X extends unknown[]> = X extends [
    infer Head,
    ...infer Tail
  ]
    ? $<F, Head> extends true
      ? [Head, ..._$filter<F, Tail>]
      : _$filter<F, Tail>
    : [];

  export abstract class Filter<F extends Kind> extends Kind {
    abstract f: (x: Cast<Kind._, unknown[]>) => _$filter<F, typeof x>;
  }
}

export default List;
