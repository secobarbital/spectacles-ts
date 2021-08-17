import { expectType } from 'tsd'
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { modifyW } from '../src'
import { data, A, B, simpleData } from '../tests/shared'

// modifies a definite value
const modified = pipe(
  simpleData,
  modifyW(['a', 'b', '0'], (j) => `${j + 2}`)
)
expectType<{
  a: {
      b: [string, string, boolean];
      c: string;
      d: boolean;
  };
  e: number;
}>(modified)

// modifies an optional value
const modified2 = pipe(
  data,
  modifyW(
    [(v): v is A => v.type === 'A', 'a', '?some', 'c', '0'],
    (j) => `${j + 4}`
  )
)
expectType<B | {
  type: "A";
  a: O.None | O.Some<{
      c: {
          0: string | number;
      };
  }> | O.Some<{
      c: [string | number, string, boolean];
      d: string[];
      e: boolean;
  }>;
}>(modified2)