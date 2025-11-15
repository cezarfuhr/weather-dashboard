import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import CurrentWeather from '../src/components/CurrentWeather.vue'
import SearchLocation from '../src/components/SearchLocation.vue'
import { useWeatherStore } from '../src/stores/weatherStore'

describe('CurrentWeather Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should render loading state', () => {
    const wrapper = mount(CurrentWeather)
    const store = useWeatherStore()

    store.loading = true

    expect(wrapper.text()).toContain('Carregando')
  })

  it('should render current weather data', async () => {
    const wrapper = mount(CurrentWeather)
    const store = useWeatherStore()

    store.currentWeather = {
      name: 'São Paulo',
      main: {
        temp: 25,
        feels_like: 26,
        humidity: 60,
        pressure: 1013
      },
      weather: [
        {
          description: 'ensolarado',
          id: 800
        }
      ],
      wind: {
        speed: 5
      }
    }

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('25°C')
    expect(wrapper.text()).toContain('ensolarado')
  })

  it('should display empty state when no data', () => {
    const wrapper = mount(CurrentWeather)

    expect(wrapper.text()).toContain('Selecione uma localização')
  })
})

describe('SearchLocation Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should render search input', () => {
    const wrapper = mount(SearchLocation)

    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('input').attributes('placeholder')).toContain('Buscar cidade')
  })

  it('should disable search button when input is empty', () => {
    const wrapper = mount(SearchLocation)
    const buttons = wrapper.findAll('button')
    const searchButton = buttons[0]

    expect(searchButton.attributes('disabled')).toBeDefined()
  })

  it('should enable search button when input has text', async () => {
    const wrapper = mount(SearchLocation)
    const input = wrapper.find('input')

    await input.setValue('São Paulo')

    const buttons = wrapper.findAll('button')
    const searchButton = buttons[0]

    expect(searchButton.attributes('disabled')).toBeUndefined()
  })
})
