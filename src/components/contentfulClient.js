/* eslint-disable no-unused-vars */
import Maybe from 'crocks/Maybe'
import fetch from 'node-fetch'

const contentful = require('contentful')
const { encaseP, map, fork, reject, resolve, chain } = require('fluture')

export const spaceId = '0wm9qd6toywt'
export const contentDeliveryToken = 'YeZK36wA90IrT4WLW1a4Ap3UAWffbyEMEaX_552hJdg'
export const contentPreviewToken = '-luKhnJQT_43JPGLHlbwWDm7AH-hAHL2dA90EY9JYw4'


const parseBody = Maybe

const verifyResponse = res => res && res.statusCode === 200
  ? resolve(res)
  : reject(Error(res.statusCode))

export const client = contentful.createClient({
  space: spaceId,
  accessToken: contentDeliveryToken,
  fetch
})

const getEntryFuture = encaseP(entry => client.getEntry(entry))

const getEntriesFuture = encaseP(client.getEntries)

export const getEntry = entry => handleError => handleSuccess => getEntryFuture(entry)
  // .map(map(verifyResponse))
  .pipe(map(parseBody))
  .pipe(fork(handleError)(handleSuccess))

export const getEntries = handleError => handleSuccess => getEntriesFuture()
  .pipe(map(parseBody))
  .pipe(fork(handleError)(handleSuccess))
