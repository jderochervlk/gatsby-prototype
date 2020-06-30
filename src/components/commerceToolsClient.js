/* eslint-disable no-unused-vars */
import { createClient } from '@commercetools/sdk-client'
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth'
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http'
import Maybe from 'crocks/Maybe'
import { encaseP, fork, map } from 'fluture'
import { path } from 'ramda'

const { Just, Nothing } = Maybe

const projectKey = 'joshua-testing'

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: 'https://auth.us-central1.gcp.commercetools.com',
  projectKey,
  credentials: {
    // types
    // clientId: '3K1B9M5OeFOFDFHVWCU-Orll',
    // clientSecret: '7uxH7OtchWIS2L5NJAMKtEepHUY9mUBs'
    // promos
    // clientId: 'sndkOOHMQH_TUuoPpb17ZIBK',
    // clientSecret: 'h9Z9R9XxGvKs2RTxcbfIL7WqbFULEej8'
    // read only
    // clientId: 'a_lUvZT9ki2EMDZeVZWkmIOI',
    // clientSecret: 'YXk4zEzmbTfg2wozE6hxuQV_2yQyEGQY'
    // everything
    clientSecret: 'DrWzQLsJG4EQvd06X_dXyqWwkODtGvKd',
    clientId: 'xZdPy7KyEE7rlT-jH77cd7T2'
  },
  // types
  // scopes: ['manage_types:joshua-testing']
  // promos
  // scopes: ['manage_cart_discounts:joshua-testing manage_categories:joshua-testing manage_discount_codes:joshua-testing']
  // read only
  scopes: ['view_shopping_lists:joshua-testing view_shipping_methods:joshua-testing view_discount_codes:joshua-testing view_types:joshua-testing view_cart_discounts:joshua-testing view_categories:joshua-testing view_customers:joshua-testing view_customer_groups:joshua-testing view_messages:joshua-testing view_products:joshua-testing view_import_sinks:joshua-testing view_states:joshua-testing view_stores:joshua-testing view_published_products:joshua-testing view_tax_categories:joshua-testing view_payments:joshua-testing view_order_edits:joshua-testing view_project_settings:joshua-testing view_orders:joshua-testing']
})
const httpMiddleware = createHttpMiddleware({
  host: 'https://api.us-central1.gcp.commercetools.com'
})

console.log(httpMiddleware)

const client = createClient({
  middlewares: [authMiddleware, httpMiddleware]
})

const clientFuture = encaseP(request => client.execute(request))

const parseBody = Maybe

const bodyExists = x => x ? Just(x) : Nothing()

export const getResultsFromBody = path(['body', 'results'])

export const commerceToolsClient =
  request =>
    getContent =>
      handleError =>
        handleSuccess =>
          clientFuture(request)
            .pipe(map(parseBody))
            .pipe(map(getContent))
            .pipe(fork(handleError)(handleSuccess))

export default commerceToolsClient
