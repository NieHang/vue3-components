const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true, jsonPointers: true }) // options can be passed, e.g. {allErrors: true}
require('ajv-errors')(ajv)
const localize = require('ajv-i18n')

const schema = {
  type: 'object',
  properties: {
    foo: {
      type: 'string',
      errorMessage: {
        type: '必须是字符串',
        minLength: '长度不能小于10',
      },
      minLength: 10,
    },
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
      minLength: 10,
    }
  },
})

const validate = ajv.compile(schema)

const data = {
  foo: '123',
  bar: 'test',
}
const valid = validate(data)
if (!valid) {
  // localize.zh(validate.errors)
  console.log(validate.errors)
}
