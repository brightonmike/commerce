import {
  CommerceAPI,
  CommerceAPIConfig,
  getCommerceApi as commerceApi,
} from '@commerce/api'

import {
  API_URL,
  API_TOKEN,
  MAGENTO_CUSTOMER_TOKEN_COOKIE,
  MAGENTO_CHECKOUT_ID_COOKIE,
} from '../const'

import fetchGraphqlApi from './utils/fetch-graphql-api'

import * as operations from './operations'

if (!API_URL) {
  throw new Error(
    `The environment variable NEXT_PUBLIC_MAGENTO_STORE_DOMAIN is missing and it's required to access your store`
  )
}

if (!API_TOKEN) {
  throw new Error(
    `The environment variable NEXT_PUBLIC_MAGENTO_STOREFRONT_ACCESS_TOKEN is missing and it's required to access your store`
  )
}
export interface MagentoConfig extends CommerceAPIConfig {}

const ONE_DAY = 60 * 60 * 24

const config: MagentoConfig = {
  commerceUrl: API_URL,
  apiToken: API_TOKEN,
  customerCookie: MAGENTO_CUSTOMER_TOKEN_COOKIE,
  cartCookie: MAGENTO_CHECKOUT_ID_COOKIE,
  cartCookieMaxAge: ONE_DAY * 30,
  fetch: fetchGraphqlApi,
}

export const provider = {
  config,
  operations,
}

export type Provider = typeof provider

export type MagentoAPI<P extends Provider = Provider> = CommerceAPI<P>

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any
): MagentoAPI<P> {
  return commerceApi(customProvider)
}
