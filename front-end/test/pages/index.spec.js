import Vue from 'vue'
import Vuetify from 'vuetify'
import index from '@/pages/index.vue'
import { shallowMount } from '@vue/test-utils'
import { listBookings as mockListBookings } from '@/plugin/api'
import { filterBookings as mockFilterBookings } from '@/plugin/api'

Vue.use(Vuetify)

let pastBookingsResponse = {
  status: 200,
  data: {
    message: 'successful',
    bookings: [
      {
        id: 5,
        reason: "Dolor et repudiandae veritatis eos voluptatem quia reiciendis asperiores.",
        date: "2022-04-05 01:06:41",
        created_at: "2024-04-06T09:26:35.000000Z",
        updated_at: "2023-04-06T09:26:35.000000Z",
        user_id: 2
      }
    ]
  }
}
let futureBookingsResponse = {
  status: 200,
  data: {
    message: 'successful',
    bookings: [
      {
        id: 5,
        reason: "Dolor et repudiandae veritatis eos voluptatem quia reiciendis asperiores.",
        date: "2024-04-05 01:06:41",
        created_at: "2024-04-06T09:26:35.000000Z",
        updated_at: "2023-04-06T09:26:35.000000Z",
        user_id: 2
      }
    ]
  }
}

let allBookingsResponse = {
  status: 200,
  data: {
    message: 'successful',
    bookings: [
      {
        id: 4,
        reason: "Mollitia nihil sed aut cum.",
        date: "2023-04-05 01:06:41",
        created_at: "2023-04-06T09:26:35.000000Z",
        updated_at: "2023-04-06T09:26:35.000000Z",
        user_id: 2
      },
      {
        id: 5,
        reason: "Dolor et repudiandae veritatis eos voluptatem quia reiciendis asperiores.",
        date: "2023-04-05 01:06:41",
        created_at: "2023-04-06T09:26:35.000000Z",
        updated_at: "2023-04-06T09:26:35.000000Z",
        user_id: 2
      }
    ],
  }
}

jest.mock('@/plugin/api', () => ({
  listBookings: jest.fn(() => Promise.resolve(allBookingsResponse)),
  filterBookings: jest.fn((type) => {
    if(type === 'past') {
      return Promise.resolve(pastBookingsResponse)
    } else if(type === 'future'){
      return Promise.resolve(futureBookingsResponse)
    }
  })
}))

describe('index', () => {
  let wrapper
  let routePush = jest.fn()

  beforeEach(() => {
    wrapper = shallowMount(index, {
      mocks: {
        $router: {
          push: routePush
        },
        $store: {
          getters: {
            isAuthenticated: jest.fn()
          },
        },
      },
      stubs: ['v-text-field', 'v-btn', 'nuxt-link']
    })
  })

  afterEach(() => {
    wrapper.destroy()
    jest.clearAllMocks()
  })

  it('can list all bookings', async () => {
    await wrapper.vm.allBookings()

    expect(mockListBookings).toHaveBeenCalled()
    expect(wrapper.vm.isLoading).toBeFalsy()
    expect(wrapper.vm.bookings).toEqual(allBookingsResponse.data.bookings)
  })

  it('should call filter bookings', async () => {
    await wrapper.vm.filterBookings('past')

    expect(mockFilterBookings).toHaveBeenCalledWith('past')
    expect(wrapper.vm.bookings).toEqual(pastBookingsResponse.data.bookings)

    await wrapper.vm.filterBookings('future')

    expect(mockFilterBookings).toHaveBeenCalledWith('future')
    expect(wrapper.vm.bookings).toEqual(futureBookingsResponse.data.bookings)
  })

  it('should add to bookings list', () => {
    const booking = {
      reason: "Dolor et repudiandae veritatis",
      date: "2022-04-05 01:06:41",
    };
    const lengthBefore = wrapper.vm.bookings.length
    wrapper.vm.appendBookingList(booking)
    const lengthAfter= wrapper.vm.bookings.length

    expect(lengthAfter).toBeGreaterThan(lengthBefore)
  })

  it('should open dialog', async () => {
    wrapper.vm.$refs.addDialogRef.toggleDialog = jest.fn()
    wrapper.vm.showAddBooking()
    expect(wrapper.vm.$refs.addDialogRef.toggleDialog).toHaveBeenCalledWith(true)
  })
})
