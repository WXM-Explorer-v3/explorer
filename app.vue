<script lang="ts" setup>
  import { storeToRefs } from 'pinia'
  import wxmApi from '~/api/wxmApi'
  import { useSettingsStore } from '~/stores/settingsStore'

  import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/vue'

  const { theme } = storeToRefs(useSettingsStore())
  const config = useRuntimeConfig().public

  const { getFirebaseId } = useFirebase()
  const { userAgent } = useUserAgent()
  const firebaseId = await getFirebaseId()


  onBeforeMount(() => {
    wxmApi.setupAxios(config.apiUrl, userAgent, firebaseId)
  })
   // 1. Your WalletConnect Cloud project ID
   console.log(config.projectId)
  const projectId = config.projectId

  // 2. Set chains
  const arbSepolia = {
    chainId: 421614,
    name: 'Arbitrium Sepolia',
    currency: 'ETH',
    explorerUrl: 'https://sepolia.arbiscan.io',
    rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc'
  }

  // 3. Create your application's metadata object
  const metadata = {
    name: 'WXM Explorer',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  }

  // 4. Create Ethers config
  const ethersConfig = defaultConfig({
    /*Required*/
    metadata
  })

  // 5. Create a Web3Modal instance
  const modal = createWeb3Modal({
    ethersConfig,
    chains: [arbSepolia],
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true // Optional - false as default
  })
 
</script>

<template>
  <div>
    <VThemeProvider :theme="theme.currentTheme">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </VThemeProvider>
  </div>
</template>

<style>
  html {
    overflow: hidden !important;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  html::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
</style>
