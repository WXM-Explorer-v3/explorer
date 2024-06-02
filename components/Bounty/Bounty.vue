<script setup lang="ts">
    import { useDisplay } from 'vuetify'
    import { useBountyStore } from '~/stores/bountyStore'; 
    import darkLogo from '~/assets/Dark_Logo.svg'
    import getBounties from './utils/getBounties';
    import { useWeb3ModalAccount } from '@web3modal/ethers/vue';


    const display = ref(useDisplay())
    const bountyStore = useBountyStore()
    const amount = ref("")


    const getCenter = computed(() => {
      console.log(bountyStore.bountyCenter)
      return bountyStore.bountyCenter
});
const getBountyId = computed(() => {
  return bountyStore.bountyId
})
    const isNew = computed(() => {
      console.log(getCenter.value)
      console.log(getBountyId.value)
        if(getBountyId.value === null && getCenter.value.lat && getCenter.value.lng) {
            return true
        } else {
          return false
        }
    })


    const onClick = async () => {
        const {address} = useWeb3ModalAccount()
        if (getBountyId.value !== null) {
          await getBounties.contribute(getBountyId.value, amount.value, address.value)
        } else {
          await getBounties.createBounty(getCenter.value.lat, getCenter.value.lng, amount.value, address.value)
        }
        console.log(amount.value)
    }


</script>

<template>
    <VCard class="w-100 h-100 pt-16" :color="display.smAndDown ? `background` : `blueTint`">
        <div>
            <div class="pt-7 pb-6 px-4">
            <img
                style="cursor: pointer"
                class="mb-4"
                alt="logo"
                :src="darkLogo"
            />
            </div>
            <div class="px-4 text--text" style="font-size: 1.875rem; font-weight: 300; line-height: 36px">
          {{ isNew ? "Create Bounty": "Contribute to Bounty" }}
        </div>
        <div
          class="px-4 pb-text--text"
          style="font-size: 1.875rem; font-weight: 600; line-height: 36px"
        >
          {{ isNew ? parseFloat(getCenter?.lat).toFixed(2) + ", " + parseFloat(getCenter?.lng).toFixed(2) + " DD" : `Bounty ID - ${getBountyId}`}}
        </div>
        </div>
        <VCardText class="ma-0 pa-0 h-100 w-100">
      <VCard
        height="100%"
        class="w-100"
        color="background"
        elevation="0"
        style="
          border-top-left-radius: 32px;
          border-top-right-radius: 32px;
          border-bottom-left-radius: 0px;
          border-bottom-right-radius: 0px;
        "
      >
      <VSheet
    color="top"
    style="border-radius: 16px"
    class="pt-6 mr-2 ml-2"
    :class="display.smAndDown ? `mb-3` : `mb-4`"
    elevation="4"
  >
    <div class="px-2 pt-2 text-body-2">
        <div class="text-subtitle-1 text-text mb-4" style="font-weight: 700">
              {{ (isNew?"Total":"Contribute to") + " Bounty (in WXM)" }}
            </div>
        <VTextField v-model="amount"
              :hide-details="true"
              density="compact"
              class=""
              color="darkGrey"
              base-color="darkGrey"
              type="number"
              bg-color="layer1"></VTextField>
              <button v-on:click="onClick" class="w-100 text-subtitle-1 pt-2 pb-2" style="font-weight: 700">{{ (isNew?"Create":"Contribute")}}</button>

      <!-- <div style="font-size: 1.094rem; font-weight: 700" class="text-text pl-2 pt-1">
        {{ "weatherStationDaysCardTitle" }}
      </div> -->
      <div>
      </div>
    </div>
    </VSheet>
    <VSheet
    color="top"
    style="border-radius: 16px"
    class="pt-6 mr-2 ml-2 pb-6"
    :class="display.smAndDown ? `mb-3` : `mb-4`"
    elevation="4"
  >
    <div class="px-2 pt-2 text-body-2">
        <div class="text-subtitle-1 text-text mb-4" style="font-weight: 700">
              {{ "How to claim?" }}
            </div>
            <div>1. Download the following script 
              <a
                  :href="'https://github.com/parthg1901/wxm-contracts/blob/develop/chainlink-functions/user_request.js'"
                  target="_blank"
                  class="text-decoration-none text-blue"
                >
                  {{ "View Script" }}
                  <i class="text-text fa-solid fa-arrow-up-right-from-square"></i>
                </a></div>
                <div>2. Login into WXM Api Website and get bearer token from there</div>
                <div>3. Run the script in the following format - </div>
                <div style="white-space: nowrap; /* Prevent text from wrapping */
      overflow-x: auto;    /* Enable horizontal scrolling */
      overflow-y: hidden;
      background-color: #3D5F92;"><div>node user_request.js "YOUR_BEARER_TOKEN" "YOUR_DEVICE_ID" "YOUR_REGISTERED_WALLET" "YOUR_PRIVATE_KEY" "BOUNTY_ID"</div>
</div>
                <div>4. If eligible, you'll automatically receive the bounty within 2-3 minutes </div>
                


      <!-- <div style="font-size: 1.094rem; font-weight: 700" class="text-text pl-2 pt-1">
        {{ "weatherStationDaysCardTitle" }}
      </div> -->
      <div>
      </div>
    </div>
    </VSheet>
      </VCard>
      </VCardText>
    </VCard>
  </template>