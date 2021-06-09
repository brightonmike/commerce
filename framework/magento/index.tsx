import * as React from 'react'
import { ReactNode } from 'react'

import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'

import { magentoProvider, MagentoProvider } from './provider'
import { MAGENTO_CHECKOUT_ID_COOKIE } from './const'

export { magentoProvider }
export type { MagentoProvider }

export const magentoConfig: CommerceConfig = {
  locale: 'en-us',
  cartCookie: MAGENTO_CHECKOUT_ID_COOKIE,
}

export type MagentoConfig = Partial<CommerceConfig>

export type MagentoProps = {
  children?: ReactNode
  locale: string
} & MagentoConfig

export function CommerceProvider({ children, ...config }: MagentoProps) {
  return (
    <CoreCommerceProvider
      provider={magentoProvider}
      config={{ ...magentoConfig, ...config }}
    >
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce<MagentoProvider>()
