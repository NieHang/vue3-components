import { FieldPropsDefine } from '../types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StringField',
  props: FieldPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const value = e.target.value
      props.onChange(value)
    }
    return () => {
      const value = props.value

      return <input type="text" value={value as any} onInput={handleChange} />
    }
  },
})
