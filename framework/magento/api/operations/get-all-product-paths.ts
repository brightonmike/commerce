import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import { GetAllProductPathsOperation } from '../../types/product'
import {
  GetAllProductPathsQuery,
  GetAllProductPathsQueryVariables,
  ProductEdge,
} from '../../schema'
import type { MagentoConfig, Provider } from '..'
import { getAllProductsQuery } from '../../utils'

export default function getAllProductPathsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProductPaths<
    T extends GetAllProductPathsOperation
  >(opts?: {
    variables?: T['variables']
    config?: MagentoConfig
  }): Promise<T['data']>

  async function getAllProductPaths<T extends GetAllProductPathsOperation>(
    opts: {
      variables?: T['variables']
      config?: MagentoConfig
    } & OperationOptions
  ): Promise<T['data']>

  async function getAllProductPaths<T extends GetAllProductPathsOperation>({
    query = getAllProductsQuery,
    config,
    variables,
  }: {
    query?: string
    config?: MagentoConfig
    variables?: T['variables']
  } = {}): Promise<T['data']> {
    config = commerce.getConfig(config)

    const { data } = await config.fetch<
      GetAllProductPathsQuery,
      GetAllProductPathsQueryVariables
    >(query, { variables })

    return {
      products: data.products.edges.map(({ node: { handle } }) => ({
        path: `/${handle}`,
      })),
    }
  }

  return getAllProductPaths
}
