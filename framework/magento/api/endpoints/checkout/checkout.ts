import {
  MAGENTO_CHECKOUT_ID_COOKIE,
  MAGENTO_CHECKOUT_URL_COOKIE,
  MAGENTO_CUSTOMER_TOKEN_COOKIE,
} from '../../../const'
import associateCustomerWithCheckoutMutation from '../../../utils/mutations/associate-customer-with-checkout'
import type { CheckoutEndpoint } from '.'

const checkout: CheckoutEndpoint['handlers']['checkout'] = async ({
  req,
  res,
  config,
}) => {
  const { cookies } = req
  const checkoutUrl = cookies[MAGENTO_CHECKOUT_URL_COOKIE]
  const customerCookie = cookies[MAGENTO_CUSTOMER_TOKEN_COOKIE]

  if (customerCookie) {
    try {
      await config.fetch(associateCustomerWithCheckoutMutation, {
        variables: {
          checkoutId: cookies[MAGENTO_CHECKOUT_ID_COOKIE],
          customerAccessToken: cookies[MAGENTO_CUSTOMER_TOKEN_COOKIE],
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  if (checkoutUrl) {
    res.redirect(checkoutUrl)
  } else {
    res.redirect('/cart')
  }
}

export default checkout
