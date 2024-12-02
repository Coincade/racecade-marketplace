"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";

import { nft_address, market_address, nft_abi, market_abi } from "./constants";

import { useAccount } from "wagmi";
import { Network, Alchemy } from "alchemy-sdk";

import { useActiveAccount } from "thirdweb/react";
import { client } from "@/app/client";
import { polygonAmoy } from "thirdweb/chains";
import { Loader } from "lucide-react";

export const NFTContext = React.createContext();

const fetchNftContract = (signerOrProvider) =>
  new ethers.Contract(nft_address, nft_abi, signerOrProvider);
const fetchMarketContract = (signerOrProvider) =>
  new ethers.Contract(market_address, market_abi, signerOrProvider);

const settings = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY, // Replace with your Alchemy API Key.
  network: Network.MATIC_AMOY, // Replace with your network.
};

const alchemy = new Alchemy(settings);

const rpc_url =
  process.env.ENV === "prod"
    ? process.env.NEXT_PUBLIC_PROD_RPC_URL
    : process.env.NEXT_PUBLIC_DEV_RPC_URL;

export const NFTProvider = ({ children }) => {
  const nftCurrency = "POL";
  const gemCurrency = "GEM";

  const [isLoadingNFT, setIsLoadingNFT] = useState(false);

  const fetchUserBalance = async (wallet_address) => {
    const balance = await alchemy.core.getBalance(wallet_address, "latest");

    //Logging the response to the console
    console.log(balance);

    return balance.toString();
  };

  const fetchNFTsListedForMint = async () => {
    try {
      setIsLoadingNFT(true);
      const {
        data: { car_data },
      } = await axios.get(
        "https://game-cibqh.ondigitalocean.app/api/private/v0/all-cars-fetch"
      );

      const filteredData = [];
      for (let i = 0; i < car_data.length; i++) {
        if (car_data[i].is_nft_listed_for_mint) {
          filteredData.push(car_data[i]);
        }
      }

      return filteredData;
    } catch (error) {
      console.log(error);
      return Error(error.message);
    } finally {
      setIsLoadingNFT(false);
    }
  };

  const fetchMyNFTs = async (wallet_address, filter = "") => {
    try {
      setIsLoadingNFT(true);
      if (!wallet_address) return [];

      const nftsForOwner = await alchemy.nft.getNftsForOwner(wallet_address);

      /*
      TODO:
      1. Get Instance of NFT marketplace
      2. run a for loop untill you find the tokenId
      3. match the element on index number [2]
      4. if this index matches - spread ownedNFTs object and add the price key and value.
      5. price value is on [3] index in the data 
      */ 
      // fetchMarketContract

      const nftsArray = nftsForOwner.ownedNfts;
      let finalNfts = nftsArray.filter((nft) => {
        return nft.contract.address == nft_address;
      });

      console.log("Final NFTS ====>", finalNfts);
      let ownedNFTs = [];

      for (let i = 0; i < finalNfts.length; i++) {
        const uri = finalNfts[i].tokenUri;
        const {
          data: { metadata },
        } = await axios.post(
          "https://game-cibqh.ondigitalocean.app/api/public/v0/get-nft-data-from-uri/",
          { uri }
        );
        console.log("metaDataa ===>", metadata);
        if (filter === "" || metadata.attributes?.[0].value === filter)
          ownedNFTs.push({ ...metadata, tokenId: finalNfts[i].tokenId });
      }

      console.log("Owned NFTs ===> ", ownedNFTs);

      return ownedNFTs;
    } catch (error) {
      console.log("Error fetching NFTs:", error);
      return [];
    } finally {
      setIsLoadingNFT(false);
    }
  };
  const fetchNFTDataById = async (tokenId) => {
    try {
      const provider = new ethers.JsonRpcProvider(rpc_url);
      const nft_contract = fetchNftContract(provider);
      const uri_old = await nft_contract.tokenURI(tokenId);
      const uri = uri_old.replace(
        "http://159.89.175.249:7070/",
        "https://racecadecarsmetadata.blr1.cdn.digitaloceanspaces.com/"
      );

      // Fetch the metadata from the URI
      const response = await fetch(uri);
      if (!response.ok)
        throw new Error(`Failed to fetch metadata: ${response.statusText}`);
      const metadata = await response.json();

      return {
        ...metadata,
        tokenId
      };
    } catch (error) {
      console.error("Error fetching NFT data by ID:", error);
      throw error; // Let the caller handle it
    }
  };
  const fetchOwnerOfNFT = async (tokenId) => {
    try {
      const provider = new ethers.JsonRpcProvider(rpc_url);
      const nft_contract = fetchNftContract(provider);
      const data = await nft_contract.ownerOf(tokenId);
      console.log(data);
      return data;
    } catch (error) {
      console.log("Err in fetchOwnerOfNFT ==> ", error);
    }
  };

  const fetchListedNFTs = async () => {
    setIsLoadingNFT(true);
    try {
      const listedNFTs = [];
      const provider = new ethers.JsonRpcProvider(rpc_url);
      const market_contract = fetchMarketContract(provider);
      const item_count = Number(await market_contract.itemCount());
      console.log("Item Count: ", item_count);

      for (let i = 1; i <= Number(item_count); i++) {
        const data = await market_contract.items(i);
        let obj = {
          listedId: Number(data[0]),
          ownerAddress: data[1],
          tokenId: Number(data[2]),
          listedPrice: Number(data[3]),
          sellerAddress: data[4],
          isSold: data[5],
        };
        listedNFTs.push(obj);
      }
      console.log("Listed NFTs ===>", listedNFTs);
      return listedNFTs;
    } catch (error) {
      console.log(" ERR in fetching market contrcat ===>", error);
    } finally {
      setIsLoadingNFT(false);
    }
  };

  const getMarketId = async(_tokenId) => {
    try {
      setIsLoadingNFT(true);
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
        if(Number(obj.tokenId) == Number(_tokenId)){
          console.log("Data in Loop => ", obj.tokenId);
          return obj.listedId
        }        
      }
      return 0;

    } catch (error) {
      console.log(" ERR in fetching market contrcat ===>", error);
    }
    finally {
      setIsLoadingNFT(false);
    }
  }

  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
        gemCurrency,
        isLoadingNFT,
        fetchNFTsListedForMint,
        fetchMyNFTs,
        fetchNFTDataById,
        fetchOwnerOfNFT,
        fetchUserBalance,
        fetchListedNFTs,
        getMarketId
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
