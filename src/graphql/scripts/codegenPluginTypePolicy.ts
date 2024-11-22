// https://github.com/homebound-team/graphql-typescript-scalar-type-policies/blob/ec2ccd99acb9a64302d133b9afabb90ec62d5420/src/index.ts
import type { PluginFunction, Types } from '@graphql-codegen/plugin-helpers'
import type { GraphQLField, GraphQLSchema } from 'graphql'
import { isNonNullType, isObjectType, isScalarType } from 'graphql'
import { code, imp } from 'ts-poet'

interface Config {
  scalarTypePolicies?: Record<string, string>
}

/** Generates field policies for user-defined types, i.e. Date handling. */
const plugin: PluginFunction<Config> = async (schema: GraphQLSchema, _, config: Config) => {
  const { scalarTypePolicies = {} } = config || {}

  function isScalarWithTypePolicy(f: GraphQLField<any, any>) {
    let type = f.type
    if (isNonNullType(type))
      type = type.ofType

    return isScalarType(type) && scalarTypePolicies[type.name] !== undefined
  }

  const content = await code`
    export default {
      ${Object.values(schema.getTypeMap())
        .filter(isObjectType)
        .filter(t => !t.name.startsWith('__'))
        .filter(t => Object.values(t.getFields()).some(isScalarWithTypePolicy))
        .map((type) => {
          return code`${type.name}: { fields: { ${Object.values(type.getFields())
            .filter(isScalarWithTypePolicy)
            .map((field) => {
              let type = field.type
              if (isNonNullType(type))
                type = type.ofType
              return code`${field.name}: ${toImp(scalarTypePolicies[type.name])},`
            })} } },`
        })}
    }
  `.toString()

  return { content } as Types.PluginOutput
}

// Maps the graphql-code-generation convention of `@src/context#Context` to ts-poet's `Context@@src/context`.
function toImp(spec: string) {
  if (!spec)
    return undefined

  const [path, symbol] = spec.split('#')
  return imp(`${symbol}@${path}`)
}

export { plugin }
