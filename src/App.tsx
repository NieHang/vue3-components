import { defineComponent, Ref, ref } from 'vue'
import MonacoEditor from './components/MonacoEditor'
import { createUseStyles } from 'vue-jss'

function toJson(schema: any): string {
  return JSON.stringify(schema, null, 2)
}

const schema = {
  type: 'string',
}

const useStyles = createUseStyles({
  editor: {
    minHeight: 400,
  },
})

export default defineComponent({
  name: 'App',
  setup() {
    const schemaRef: Ref<any> = ref(schema)

    const classRef = useStyles()

    const handleChange = (code: string) => {
      let schema: any
      try {
        schema = JSON.parse(code)
      } catch (e) {
        console.log(e)
      }
      schemaRef.value = schema
    }

    return () => {
      const code = toJson(schemaRef.value)
      const styles = classRef.value
      return (
        <div>
          <MonacoEditor
            code={code}
            onChange={handleChange}
            title="Schema"
            class={styles.editor}
          />
        </div>
      )
    }
  },
})
