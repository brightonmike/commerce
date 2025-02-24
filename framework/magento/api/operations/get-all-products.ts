import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import { GetAllProductsOperation } from '../../types/product'
import {
  GetAllProductsQuery,
  GetAllProductsQueryVariables,
  Product as MagentoProduct,
} from '../../schema'
import type { MagentoConfig, Provider } from '..'
import getAllProductsQuery from '../../utils/queries/get-all-products-query'
import { normalizeProduct } from '../../utils'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts<T extends GetAllProductsOperation>(opts?: {
    variables?: T['variables']
    config?: Partial<MagentoConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getAllProducts<T extends GetAllProductsOperation>(
    opts: {
      variables?: T['variables']
      config?: Partial<MagentoConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getAllProducts<T extends GetAllProductsOperation>({
    query = getAllProductsQuery,
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<MagentoConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    const { fetch, locale } = commerce.getConfig(config)

    const { data } = await fetch<
      GetAllProductsQuery,
      GetAllProductsQueryVariables
    >(
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

    return {
      products: data.products.edges.map(({ node }) =>
        normalizeProduct(node as MagentoProduct)
      ),
    }
  }

  return getAllProducts
}
