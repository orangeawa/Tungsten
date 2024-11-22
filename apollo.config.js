export default {
  client: {
    service: {
      name: 'PatchyVideo GraphQL API (local)',
      localSchemaFile: './src/graphql/dist/schema.graphql',
    },
    // Files processed by the extension
    includes: ['./**/*.{graphql,js,ts,jsx,tsx,vue}'],
    excludes: ['./src/graphql/dist/*'],
    // disable validation for now, most of the validations are incompatible with the current graphql plugin.
    validationRules: [],
    tagName: 'gql',
  },
}
