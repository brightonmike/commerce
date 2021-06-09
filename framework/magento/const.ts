export const MAGENTO_CHECKOUT_ID_COOKIE = 'magento_checkoutId'

export const MAGENTO_CHECKOUT_URL_COOKIE = 'magento_checkoutUrl'

export const MAGENTO_CUSTOMER_TOKEN_COOKIE = 'magento_customerToken'

export const STORE_DOMAIN = process.env.NEXT_PUBLIC_MAGENTO_STORE_DOMAIN

export const MAGENTO_COOKIE_EXPIRE = 30

export const API_URL = `https://${STORE_DOMAIN}/graphql`

export const API_TOKEN = process.env.NEXT_PUBLIC_MAGENTO_STOREFRONT_ACCESS_TOKEN
