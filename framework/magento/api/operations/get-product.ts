import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import { GetProductOperation } from '../../types/product'
import { normalizeProduct, getProductQuery } from '../../utils'
import type { MagentoConfig, Provider } from '..'
import { GetProductBySlugQuery, Product as MagentoProduct } from '../../schema'

export default function getProductOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getProduct<T extends GetProductOperation>(opts: {
    variables: T['variables']
    config?: Partial<MagentoConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getProduct<T extends GetProductOperation>(
    opts: {
      variables: T['variables']
      config?: Partial<MagentoConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getProduct<T extends GetProductOperation>({
    query = getProductQuery,
    variables,
    config: cfg,
  }: {
    query?: string
    variables: T['variables']
    config?: Partial<MagentoConfig>
    preview?: boolean
  }): Promise<T['data']> {
    const { fetch, locale } = commerce.getConfig(cfg)

    const {
      data: { productByHandle },
    } = await fetch<GetProductBySlugQuery>(
      query,
      {
        variables,
      },
      {
        ...(locale && {
          headers: {
            'Accept-Language': locale,
          },
        }),
      }
    )

    return {
      ...(productByHandle && {
        product: normalizeProduct(productByHandle as MagentoProduct),
      }),
    }
  }

  return getProduct
}
