import { ethers } from "ethers";
import { nft_address, market_address, nft_abi, market_abi } from "../context/constants";

const fetchNftContract = (signerOrProvider) =>
  new ethers.Contract(nft_address, nft_abi, signerOrProvider);
const fetchMarketContract = (signerOrProvider) =>
  new ethers.Contract(market_address, market_abi, signerOrProvider);

const rpc_url =
  process.env.ENV === "prod"
    ? process.env.NEXT_PUBLIC_PROD_RPC_URL
    : process.env.NEXT_PUBLIC_DEV_RPC_URL;


export const getMarketId = async (_tokenId) => {
  const provider = new ethers.JsonRpcProvider(rpc_url);
  const market_contract = fetchMarketContract(provider);
  const item_count = Number(await market_contract.itemCount());
  console.log("Item Count: ", item_count);

  for (let i = 1; i <= item_count; i++) {
    const data = await market_contract.items(i);

    let obj = {
      listedId: Number(data[0]),
      ownerAddress: data[1],
      tokenId: Number(data[2]),
      listedPrice: Number(data[3]),
      sellerAddress: data[4],
      isSold: data[5],
    };
    if (Number(obj.tokenId) == Number(_tokenId)) {
      console.log("Data in Loop => ", obj.tokenId);
      return obj.listedId;
    }
  }
  return 0;
};
