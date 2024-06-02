import { defineStore } from 'pinia'

export const useBountyStore = defineStore('BountyStore', {
  state: () => {
    return {
      bountyId: null,
      bountyCenter: null,
      activeBounties: null,
      balance: ""
    }
  },
  getters: {
    getBountyId: (state) => state.bountyId,
    getActiveBounties: (state) => state.activeBounties,
    getBalance: (state) => state.balance,
    getBountyCenter: (state) => state.bountyCenter
  },

  actions: {
    setBountyId(value) {
      this.bountyId = value
    },
    setActiveBounties(value) {
      this.activeBounties = value
    },
    setBalance(value) {
      this.balance = value
    },
    setBountyCenter(value) {
      this.bountyCenter = value
    }
  }
})
