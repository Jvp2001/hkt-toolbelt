import $, { Cast, Kind } from ".";

export abstract class Self extends Kind {
  abstract f: (x: this[Kind._]) => Self;
}

export abstract class ApplySelf extends Kind {
  abstract f: (
    x: Cast<this[Kind._], Kind>
  ) => $<typeof x, Cast<typeof x, Kind.InputOf<typeof x>>>;
}

export * as Combinator from "./combinator";
