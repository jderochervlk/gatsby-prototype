/* eslint-disable no-unused-vars */
import compose from 'crocks/helpers/compose'
import ifElse from 'crocks/logic/ifElse'
import Maybe from 'crocks/Maybe'
import safe from 'crocks/Maybe/safe'
import map from 'crocks/pointfree/map'
import isDefined from 'crocks/predicates/isDefined'
const { Just, Nothing } = Maybe

const renderMaybe = renderNothing => renderJust => x => {
  return x.map(renderJust).option(renderNothing())
}

export default renderMaybe
