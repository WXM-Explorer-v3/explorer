import abi from '~/abi/BountyManager.json'
import generatePolygon from './generatePolygon';
import { useBountyStore } from '~/stores/bountyStore';
import type { BountyCell, FeatureCollection, Point } from '../types/bounties';
import createCellsCollection from './createCellsCollection';
import { ethers } from 'ethers';
import { useWeb3ModalProvider } from '@web3modal/ethers/vue';

const bountyStore = useBountyStore()
const provider = new ethers.JsonRpcProvider("https://sepolia-rollup.arbitrum.io/rpc")
const contract = new ethers.Contract("0x89fb12264B5D9DA8604cd9BcB6Abb593a91B172e", abi, provider);

const WXMAddress = '0x4Fc5C4461Ca5Fdc7b9D91c6B0DEfEB5D9Fb5Eb43'

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const WXMAbi = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint)',
  'function transfer(address to, uint amount)',
  'function approve(address, uint256) external returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint amount)'
]
const wxmContract = new ethers.Contract(WXMAddress, WXMAbi, provider);

const getBalance = async (address: string) => {
  const balance = await wxmContract.balanceOf(address)
  console.log(balance)
  
  bountyStore.setBalance(ethers.formatUnits(balance, 18));
  return balance
}

const createBounty = async (lat: string, lng: string, amount: string, address: string) => {
    const {walletProvider} = useWeb3ModalProvider()

    let data = wxmContract.interface.encodeFunctionData("approve", [await contract.getAddress(), ethers.parseEther(amount)])
    await walletProvider.value?.request({
      method: "eth_sendTransaction",
      params: [{
        from: address,
        to: await wxmContract.getAddress(),
        data: data
      }]
    })
    data = contract.interface.encodeFunctionData("createBounty", [lat.toString(), lng.toString(), ethers.parseEther(amount)])
    await walletProvider.value?.request({
      method: "eth_sendTransaction",
      params: [{
        from: address,
        to: await contract.getAddress(),
        data: data
      }]
    })
}

const contribute = async (id: number, amount: string, address: string) => {
  const {walletProvider} = useWeb3ModalProvider()

  let data = wxmContract.interface.encodeFunctionData("approve", [await contract.getAddress(), ethers.parseEther(amount)])
  await walletProvider.value?.request({
    method: "eth_sendTransaction",
    params: [{
      from: address,
      to: await wxmContract.getAddress(),
      data: data
    }]
  })
  data = contract.interface.encodeFunctionData("contribute", [id, ethers.parseEther(amount)])
  await walletProvider.value?.request({
    method: "eth_sendTransaction",
    params: [{
      from: address,
      to: await contract.getAddress(),
      data: data
    }]
  })
}

const getBounties = async () => {
  // get data
  const bounties = await contract.getBounties()
  console.log(bounties.length)
  if (bounties.length > 0) {
    const bountyCells: BountyCell[] = bounties.filter((bounty: any) => !bounty[4]).map((bounty: any) => {
        const center: Point = {lat: parseFloat(bounty[1]), lon: parseFloat(bounty[2])};
        const polygon: Point[] = generatePolygon.generatePolygon(center, 1500, 6)
        console.log(polygon)
        const bountyData: BountyCell = {
          id: Number(bounty[0]),
          center: center,
          polygon,
          amount: ethers.formatUnits(bounty[3], 18).toString() + " WXM"
        }
        console.log(bountyData)
        return bountyData
      })
    console.log(bountyCells)
    const cellsCollection: FeatureCollection = createCellsCollection.createCellsCollection(bountyCells)
    const heatmapCollection: FeatureCollection = createCellsCollection.createHeatmapCollection(bountyCells)

    bountyStore.setActiveBounties({
      cellsCollection,
      heatmapCollection
    })
    return {
      cellsCollection,
      heatmapCollection
    };
  } else {
    return {}
  }
}

export default {
  getBounties,
  getBalance,
  createBounty,
  contribute
}
