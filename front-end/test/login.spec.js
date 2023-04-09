import Vue from 'vue'
import Vuetify from 'vuetify'
import login from '@/pages/login.vue'
import { shallowMount } from '@vue/test-utils'
import { login as mockLogin } from '@/plugin/api'

Vue.use(Vuetify)

let response = { data: { access_token: '12345' } };

jest.mock('@/plugin/api', () => ({
  login: jest.fn(() => Promise.resolve(response))
}))

describe('login', () => {
  let wrapper
  let setAuthentication = jest.fn()
  let routePush = jest.fn()

  beforeEach(() => {
    wrapper = shallowMount(login, {
      mocks: {
        $router: {
          push: routePush
        },
        $store: {
          commit: setAuthentication
        },
      },
      stubs: ['v-form', 'v-text-field', 'v-btn']
    })
  })

  afterEach(() => {
    wrapper.destroy()
    jest.clearAllMocks()
  })

  it('can submit login', async () => {
    const data = {
      email: 'test@example.com',
      password: 'password'
    }
    wrapper.setData(data)
    validForm(true)

    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
    Object.setPrototypeOf(window.localStorage.setItem, jest.fn())

    await wrapper.vm.submit()

    expect(mockLogin).toHaveBeenCalledWith(data)
    expect(setAuthentication).toHaveBeenCalledWith('setAuthentication', true)
    expect(routePush).toHaveBeenCalledWith('/')
    expect(window.localStorage.setItem).toHaveBeenCalledWith('access_token', response.data.access_token)
  })

  it('should not submit login', async () => {
    validForm(false)
    await wrapper.vm.submit()

    expect(mockLogin).not.toHaveBeenCalled()
    expect(setAuthentication).not.toHaveBeenCalledWith()
    expect(routePush).not.toHaveBeenCalledWith()
  })

  let validForm = (valid) => {
    wrapper.vm.$refs.loginForm.validate = jest.fn().mockReturnValue(valid)
  }

})
