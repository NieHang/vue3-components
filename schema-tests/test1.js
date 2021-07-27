const Ajv = require('ajv')
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
const localize = require('ajv-i18n')

const schema = {
  type: 'object',
  properties: {
    foo: { type: 'string', test: true },
    bar: { type: 'string' },
  },
  required: ['foo'],
  additionalProperties: false,
}

// ajv.addFormat('test', (data) => {
//   console.log(data, '----------')
//   return data === 'test'
// })

ajv.addKeyword('test', {
  macro() {
    return {
      minLength: 10
    }
  }
})

const validate = ajv.compile(schema)

const data = {
  foo: '123@q',
  bar: 'test',
}
const valid = validate(data)
if (!valid) {
  localize.zh(validate.errors)
  console.log(validate.errors)
}
