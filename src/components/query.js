import { append, join, pipe, reduce } from 'ramda'

const entries = x => x.entries()

const arrayFrom = Array.from

const tuplesToStrings = reduce((acc, [key, value]) => [...acc, `${key}=${value}`], [])

const prefix = x => `?${x}`

export const addToQuery = x =>
  pipe(
    entries,
    arrayFrom,
    tuplesToStrings,
    append(x),
    join('&'),
    prefix
  )
