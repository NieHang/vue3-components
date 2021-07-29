import { defineComponent } from 'vue'
// import NumberField from './fields/NumberField'
import NumberField from './fields/NumberField.vue'
// import StringField from './fields/StringField'
import StringField from './fields/StringField.vue'
import { FieldPropsDefine, SchemaTypes } from './types'

export default defineComponent({
  name: 'SchemaItem',
  props: FieldPropsDefine,
  setup(props) {
    return () => {
      const schema = props.schema

      // TODO: 如果 type 没有指定，我们需要猜测 type
      const type = schema.type

      let Component: any

      switch (type) {
        case SchemaTypes.STRING:
          Component = StringField
          break
        case SchemaTypes.NUMBER:
          Component = NumberField
          break
        default:
          console.warn(`${type} is not supported`)
      }
      return <Component {...props} />
    }
  },
})
