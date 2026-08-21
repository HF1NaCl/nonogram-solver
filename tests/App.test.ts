import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import App from '../src/App.vue'

describe('App', () => {
  test('should be rendering the initial screen', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        {
          path: '/',
          name: 'main',
          component: () => import('../src/layouts/MainLayout.vue'),
          children: [
            {
              path: '/',
              name: 'home',
              component: () => import('../src/views/HomeView.vue'),
            },
          ],
        },
      ],
    })

    await router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
