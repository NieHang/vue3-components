import { mount } from '@vue/test-utils'

import JsonSchemaForm, { StringField, NumberField, ArrayField } from '../../lib'

describe('ObjectField', () => {
  let schema: any
  beforeEach(() => {
    schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        age: {
          type: 'number',
        },
      },
    }
  })
  it('should render properties to correct field', async () => {
    const wrapper = mount(JsonSchemaForm as any, {
      props: {
        schema,
        value: {},
        // onChange: () => {},
      },
    })

    const strField = wrapper.findComponent(StringField)
    const numFiled = wrapper.findComponent(NumberField)

    expect(strField.exists()).toBeTruthy()
    expect(numFiled.exists()).toBeTruthy()
  })

  it('should change value when sub fields trigger on change', async () => {
    let value: any = {
      name: '123',
      age: 18,
    }
    const wrapper = mount(JsonSchemaForm as any, {
      props: {
        schema,
        value,
        onChange: (v: any) => {
          value = v
        },
      },
    })

    const strField = wrapper.findComponent(StringField)
    // const numFiled = wrapper.findComponent(NumberField)

    await strField.props('onChange')(undefined)
    // await numFiled.props('onChange')(1)

    expect(value.name).toBe(undefined)
    // expect(value.age).toEqual(1)
  })
})
