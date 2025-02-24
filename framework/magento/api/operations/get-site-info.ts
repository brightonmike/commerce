import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import { GetSiteInfoQueryVariables } from '../../schema'
import type { MagentoConfig, Provider } from '..'
import { GetSiteInfoOperation } from '../../types/site'

import { getCategories, getBrands, getSiteInfoQuery } from '../../utils'

export default function getSiteInfoOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getSiteInfo<T extends GetSiteInfoOperation>(opts?: {
    config?: Partial<MagentoConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getSiteInfo<T extends GetSiteInfoOperation>(
    opts: {
      config?: Partial<MagentoConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getSiteInfo<T extends GetSiteInfoOperation>({
    query = getSiteInfoQuery,
    config,
    variables,
  }: {
    query?: string
    config?: Partial<MagentoConfig>
    preview?: boolean
    variables?: GetSiteInfoQueryVariables
  } = {}): Promise<T['data']> {
    const cfg = commerce.getConfig(config)

    const categories = await getCategories(cfg)
    const brands = await getBrands(cfg)
    /*    
    const { fetch, locale } = cfg
    const { data } = await fetch<GetSiteInfoQuery, GetSiteInfoQueryVariables>(
      query,
      { variables },
      {
        ...(locale && {
          headers: {
            'Accept-Language': locale,
          },
        }),
      }
    )
    */

    return {
      categories,
      brands,
    }
  }

  return getSiteInfo
}
