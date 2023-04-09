import { shallowMount } from '@vue/test-utils'
import Loaders from '@/components/Loaders.vue'

describe('loaders', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Loaders, {
      stubs: ['v-skeleton-loader', 'v-row', 'v-col']
    })
  })
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })
})
