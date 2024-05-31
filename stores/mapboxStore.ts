import { defineStore } from 'pinia'

export const useMapboxStore = defineStore('MapboxStore', {
  state: () => {
    return {
      viewMode: false,
      collections: null,
      initMapPositionEvent: null,
      searchedDeviceToFly: null,
      searchedAddressToFly: null
    }
  },
  getters: {
    getView: (state) => state.viewMode,
    getCollections: (state) => state.collections,
    getInitMapPositionEvent: (state) => state.initMapPositionEvent,
    getSearchedDeviceToFly: (state) => state.searchedDeviceToFly,
    getSearchedAddressToFly: (state) => state.searchedAddressToFly
  },

  actions: {
    toggleView(value) {
      this.viewMode = value
    },
    fillCollections(calcedCollections) {
      this.collections = calcedCollections
    },
    emitInitMapPositionEvent(event) {
      this.initMapPositionEvent = event
    },
    setSearchedDeviceToFly(device) {
      this.searchedDeviceToFly = device
    },
    setSearchedAddressToFly(address) {
      this.searchedAddressToFly = address
    }
  }
})
