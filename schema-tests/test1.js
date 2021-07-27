const Ajv = require('ajv')
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

ajv.addFormat('test', (data) => {
  console.log(data, '----------')
  return data === 'test'
})

const schema = {
  type: 'object',
  properties: {
    foo: { type: 'string', format: 'email' },
    bar: { type: 'string', format: 'test' },
  },
  required: ['foo'],
  additionalProperties: false,
}

const validate = ajv.compile(schema)

const data = {
  foo: '123@qq.com',
  bar: 'test',
}
const valid = validate(data)
if (!valid) console.log(validate.errors)
