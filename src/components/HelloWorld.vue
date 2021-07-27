<template>
  <div class="hello">{{ name }}:{{ name2 }}-{{ state.name }}</div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  ref,
  watchEffect,
} from 'vue'

const PropsType = {
  msg: String,
  age: {
    type: Number as PropType<number>,
    required: true,
  },
} as const

export default defineComponent({
  name: 'HelloWorld',
  props: PropsType,
  setup() {
    const name = ref('ben')
    const state = reactive({
      name: 123,
    })
    setInterval(() => {
      name.value += '1'
    }, 1000)
    const name2 = computed(() => {
      return name.value + '2'
    })
    watchEffect(() => {
      console.log(name.value)
    })
    return {
      name,
      name2,
      state,
    }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
