import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as assert from 'assert'
import { set } from '../src'
import { Data, data, A, SimpleData, simpleData } from './shared'

describe('set', () => {
  it('modifies a definite value', () => {
    const defSet: SimpleData = pipe(simpleData, set(['a', 'b', '0'], -123))
    assert.deepStrictEqual(defSet, { a: { b: [-123, 'abc', false] }, c: 'def' })
  })
  it('modifies an optional value', () => {
    const optSet: Data = pipe(
      data,
      set([(v): v is A => v.type === 'A', 'a', '?some', 'c', '0'], -123)
    )
    assert.deepStrictEqual(optSet, {
      type: 'A',
      a: O.some({
        c: [-123, 'abc', false],
        d: ['def'],
        e: false,
      }),
    })
  })
})