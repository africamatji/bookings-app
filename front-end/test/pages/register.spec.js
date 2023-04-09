import Vue from 'vue'
import Vuetify from 'vuetify'
import register from '@/pages/register.vue'
import { shallowMount } from '@vue/test-utils'
import { register as mockRegister } from '@/plugin/api'
import { login as mockLogin} from '@/plugin/api'

Vue.use(Vuetify)

let loginResponse = {
  status: 200,
  data: {
    access_token: '12345'
  }
};
let registerResponse = {
  status: 200,
  data: {
    message: 'successful',
    user: {
      name: 'charles',
      email: 'charles@test.com',
      updated_at: '2023-04-06T09:42:15.000000Z',
      created_at: '2023-04-06T09:42:15.000000Z',
      id: 7
    }
  }
};
jest.mock('@/plugin/api', () => ({
  login: jest.fn(() => Promise.resolve(loginResponse)),
  register: jest.fn(() => Promise.resolve(registerResponse))
}))

describe('register', () => {
  let wrapper
  let setAuthentication = jest.fn()
  let routePush = jest.fn()

  beforeEach(() => {
    wrapper = shallowMount(register, {
      mocks: {
        $router: {
          push: routePush
        },
        $store: {
          commit: setAuthentication,
        },
      },
      stubs: ['v-form', 'v-text-field', 'v-btn', 'nuxt-link']
    })
  })

  afterEach(() => {
    wrapper.destroy()
    jest.clearAllMocks()
  })

  it('can submit register', async () => {
    const registerData = {
      name: 'thabo',
      email: 'test@example.com',
      password: 'password'
    }
    const loginData = {
      email: 'test@example.com',
      password: 'password'
    }
    wrapper.setData(registerData)
    validForm(true)

    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
    Object.setPrototypeOf(window.localStorage.setItem, jest.fn())

    await wrapper.vm.submit()

    expect(mockRegister).toHaveBeenCalledWith(registerData)
    wrapper.setData(loginData)
    expect(mockLogin).toHaveBeenCalledWith(loginData)

    expect(setAuthentication).toHaveBeenCalledWith('setAuthentication', true)
    expect(routePush).toHaveBeenCalledWith('/')
    expect(window.localStorage.setItem).toHaveBeenCalledWith('access_token', loginResponse.data.access_token)
  })

  it('should not register user', async () => {
    validForm(false)
    await wrapper.vm.submit()

    expect(mockLogin).not.toHaveBeenCalled()
    expect(mockRegister).not.toHaveBeenCalled()
    expect(setAuthentication).not.toHaveBeenCalledWith()
    expect(routePush).not.toHaveBeenCalledWith()
  })

  let validForm = (valid) => {
    wrapper.vm.$refs.registerForm.validate = jest.fn().mockReturnValue(valid)
  }

})
