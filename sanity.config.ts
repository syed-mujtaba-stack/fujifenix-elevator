import { schema } from './sanity/schemaTypes'
import { apiVersion, dataset, projectId } from './sanity/env'

export const config = {
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [],
}

export default config
