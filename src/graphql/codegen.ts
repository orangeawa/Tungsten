import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://patchyvideo.com/be/gql/graphql',
  generates: {
    './src/graphql/dist/types.ts': {
      plugins: [
        'typescript',
      ],
      config: {
        useImplementingTypes: true,
        addUnderscoreToArgsType: true,
        nonOptionalTypename: true,
        scalars: {
          DateTimeUtc: 'string',
          UtcDateTime: 'string',
          ObjectId: 'string',
        },
      },
    },
    './src/graphql/dist/graphql.fragment.ts': {
      plugins: [
        'fragment-matcher',
      ],
    },
    './src/graphql/dist/schema.graphql': {
      plugins: [
        'schema-ast',
      ],
    },
  },
}

export default config
