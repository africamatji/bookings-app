import Vue from 'vue'
import Vuetify from 'vuetify'
import AddDialog from '@/components/AddDialog.vue'
import { shallowMount } from '@vue/test-utils'
import { addBooking as mockAddBooking } from '@/plugin/api'

Vue.use(Vuetify)

let response = {
  status: 200,
  data: {
    message: 'successful',
    booking: {
      reason: "Here is Another Example reason...",
      date: "2023-04-05 18:33:15",
      user_id: 2,
      updated_at: "2023-04-06T15:58:50.000000Z",
      created_at: "2023-04-06T15:58:50.000000Z",
      id: 23
    }
  }
};

jest.mock('@/plugin/api', () => ({
  addBooking: jest.fn(() => Promise.resolve(response)),
}))

describe('adddialog', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(AddDialog, {
      mocks: {
        $emit: jest.fn()
      },
      stubs: ['v-dialog', 'v-card', 'v-card-title', 'v-form', 'v-textarea', 'v-date-picker', 'v-text-field', 'v-btn', 'nuxt-link']
    })
  })

  afterEach(() => {
    wrapper.destroy()
    jest.clearAllMocks()
  })

  it('can add booking', async () => {
    const data = {
      'reason': 'Reason example',
      'date': '2023-04-05 18:33:15',
    }
    const emitSpy = jest.spyOn(wrapper.vm, '$emit');

    wrapper.setData(data)
    validForm(true)

    await wrapper.vm.addBooking()
    wrapper.vm.$emit = jest.fn()
    expect(mockAddBooking).toHaveBeenCalledWith(data)
    expect(emitSpy).toHaveBeenCalledWith('appendBookingList', response.data.booking);

  })

  it('should not add booking', async () => {
    validForm(false)
    await wrapper.vm.addBooking()

    expect(mockAddBooking).not.toHaveBeenCalled()
  })


  it('should hide / show dialog', () => {
    wrapper.vm.toggleDialog(true)
    expect(wrapper.vm.dialog).toBeTruthy()
    wrapper.vm.toggleDialog(false)
    expect(wrapper.vm.dialog).toBeFalsy()
  })

  let validForm = (valid) => {
    wrapper.vm.$refs.addForm.validate = jest.fn().mockReturnValue(valid)
  }
})
