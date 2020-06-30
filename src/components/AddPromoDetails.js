/* eslint-disable no-unused-vars */

import compose from 'crocks/helpers/compose'
import ifElse from 'crocks/logic/ifElse'
import Maybe from 'crocks/Maybe'
import safe from 'crocks/Maybe/safe'
import map from 'crocks/pointfree/map'
import isDefined from 'crocks/predicates/isDefined'
import { identity, prop, props } from 'ramda'
import React, { useEffect, useMemo, useState } from 'react'

import { useContentfulRequest } from '../hooks'
import { getPromoCode } from '../promoCode'
import { commerceToolsClient }./promoCodemerceToolsClient'

const { Just, Nothing } = Maybe

const log = map(console.log)

const AddPromoDetails = () => {
  // get promo details
  const promoRequest = useMemo(() => getPromoCode('podcast'), [])
  const [promoDetails, setPromoDetails] = useState()

  const [promoLoading, promoError, promo] = useContentfulRequest(promoRequest)

  const updatePromo = map(setPromoDetails)

  useEffect(() => {
    updatePromo(promo)
  }, [promo, updatePromo])

  // types
  const [type, setType] = useState()
  const [typeDetails, setTypeDetails] = useState()

  const updateTypeDetails = useMemo(() => map(setTypeDetails), [])

  useEffect(() => {
    const typeRequest = {
      uri: '/joshua-testing/types/3c0d835f-c017-43f0-842d-cbd25015ac21',
      method: 'GET'
    }
    commerceToolsClient(typeRequest)(identity)(log)(updateTypeDetails)
  }, [updateTypeDetails])

  useEffect(() => {
    if (type) updateTypeDetails(type)
  }, [type, updateTypeDetails])

  const post = useMemo(() => {
    const body = prop('body')(typeDetails)
    console.log(101, body)
    const version = prop('version')(body)

    return typeDetails ? {
      // uri: `/joshua-testing/discount-codes/${id}`,
      uri: '/joshua-testing/types/3c0d835f-c017-43f0-842d-cbd25015ac21',
      method: 'POST',
      body: JSON.stringify({
        version,
        actions: [
          {
            action: 'addFieldDefinition',
            fieldDefinition: {
              type: {
                name: 'LocalizedString'
              },
              name: 'text-block-4',
              label: { en: 'Text block 4' },
              required: false,
              inputHint: 'MultiLine'
            }
          }
        ]
      })
    } : undefined
  }, [typeDetails])

  useEffect(() => {
    if (post) {
      commerceToolsClient(post)(identity)(log)(log)
    }
  }
  , [post])
  return <p>hello world</p>
}

export default AddPromoDetails
