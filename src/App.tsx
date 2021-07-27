import { defineComponent, reactive } from 'vue'

const img = require('./assets/logo.png') // eslint-disable-line

export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive({
      name: 'niehang',
    })
    return () => {
      return (
        <div id="App">
          <img src={img} />
          {state.name}
          <input type="text" v-model={state.name} />
        </div>
      )
    }
  },
})
