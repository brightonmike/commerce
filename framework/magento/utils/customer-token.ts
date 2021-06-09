import Cookies, { CookieAttributes } from 'js-cookie'
import { MAGENTO_COOKIE_EXPIRE, MAGENTO_CUSTOMER_TOKEN_COOKIE } from '../const'

export const getCustomerToken = () => Cookies.get(MAGENTO_CUSTOMER_TOKEN_COOKIE)

export const setCustomerToken = (
  token: string | null,
  options?: CookieAttributes
) => {
  if (!token) {
    Cookies.remove(MAGENTO_CUSTOMER_TOKEN_COOKIE)
  } else {
    Cookies.set(
      MAGENTO_CUSTOMER_TOKEN_COOKIE,
      token,
      options ?? {
        expires: MAGENTO_COOKIE_EXPIRE,
      }
    )
  }
}
