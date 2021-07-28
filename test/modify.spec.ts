import { pipe } from 'fp-ts/function'
import { modify } from '../src'
import { Data, data } from './shared'

const modified: Data = pipe(
  data,
  modify(['a', 'b?', 0, 'c'] as const, (j) => j + 4)
)