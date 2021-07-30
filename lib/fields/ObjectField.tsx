import { defineComponent, inject, DefineComponent } from 'vue'
import { FieldPropsDefine } from '../types'
import { SchemaFormContextKey } from '../context'
import { isObject } from '../utils'

type SchemaItemDefine = DefineComponent<typeof FieldPropsDefine>

export default defineComponent({
  name: 'ObjectField',
  props: FieldPropsDefine,
  setup(props) {
    const context: { SchemaItem: SchemaItemDefine } | undefined =
      inject(SchemaFormContextKey)

    if (!context) throw Error('SchemaForm should be used')
    const handleObjectFieldChange = (key: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {}
      if (v === undefined) {
        delete value[key]
      } else {
        value[key] = v
      }

      props.onChange(value)
    }
    return () => {
      const { schema, rootSchema, value } = props
      const { SchemaItem } = context
      const properties = schema.properties || {}
      const currentValue: any = isObject(value) ? value : {}

      return Object.keys(properties).map((key: string, index: number) => (
        <SchemaItem
          key={index}
          schema={properties[key]}
          rootSchema={rootSchema}
          value={currentValue[key]}
          onChange={(v: any) => handleObjectFieldChange(key, v)}
        />
      ))
    }
  },
})
