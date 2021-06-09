import Cookies from 'js-cookie'

import {
  MAGENTO_CHECKOUT_ID_COOKIE,
  MAGENTO_CHECKOUT_URL_COOKIE,
  MAGENTO_COOKIE_EXPIRE,
} from '../const'

import checkoutCreateMutation from './mutations/checkout-create'
import { CheckoutCreatePayload } from '../schema'

export const checkoutCreate = async (
  fetch: any
): Promise<CheckoutCreatePayload> => {
  const data = await fetch({
    query: checkoutCreateMutation,
  })

  const checkout = data.checkoutCreate?.checkout
  const checkoutId = checkout?.id

  if (checkoutId) {
    const options = {
      expires: MAGENTO_COOKIE_EXPIRE,
    }
    Cookies.set(MAGENTO_CHECKOUT_ID_COOKIE, checkoutId, options)
    Cookies.set(MAGENTO_CHECKOUT_URL_COOKIE, checkout.webUrl, options)
  }

  return checkout
}

export default checkoutCreate
