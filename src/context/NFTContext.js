"use client"
import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
import axios from "axios"

import { nft_address, market_address, nft_abi, market_abi } from "./constants"

import { useAccount } from "wagmi"
import { Network, Alchemy } from "alchemy-sdk";

import { useActiveAccount } from "thirdweb/react";

export const NFTContext = React.createContext();

const fetchNftContract = (signerOrProvider) => new ethers.Contract(nft_address, nft_abi, signerOrProvider);
const fetchMarketContract = (signerOrProvider) => new ethers.Contract(market_address, market_abi, signerOrProvider);

const settings = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY, // Replace with your Alchemy API Key.
    network: Network.MATIC_AMOY, // Replace with your network.
  };

  const alchemy = new Alchemy(settings);

export const NFTProvider = ({ children }) => {
    const nftCurrency = 'POL';
    const gemCurrency = 'GEM';

    const [isLoadingNFT, setIsLoadingNFT] = useState(false);

    const fetchNFTsListedForMint = async () => {
        try {
            const { data: { car_data } } = await axios.get("https://game-cibqh.ondigitalocean.app/api/private/v0/all-cars-fetch");

        const filteredData = []
        for (let i = 0; i < car_data.length; i++) {
            if (car_data[i].is_nft_listed_for_mint) {
                filteredData.push(car_data[i])
            }
        }

        return filteredData;
        } catch (error) {
            console.log(error);
            return Error(error.message);
            
        }
        
    }

    const fetchMyNFTs = async (wallet_address) => {
        try {
            setIsLoadingNFT(true);
            if(!wallet_address) return [];
            

            const nftsForOwner = await alchemy.nft.getNftsForOwner (wallet_address);
            
            const nftsArray = nftsForOwner.ownedNfts
            let finalNfts= nftsArray.filter((nft)=> nft.contract.address == nft_address) ;
            console.log("Final NFTS ====>" ,finalNfts);
            let ownedNFTs = []

            for (let i = 0; i < finalNfts.length; i++) {
                const uri = finalNfts[i].tokenUri
                const {data: {metadata}} = await axios.post("https://game-cibqh.ondigitalocean.app/api/public/v0/get-nft-data-from-uri/", {uri})
                console.log(metadata);
                ownedNFTs.push(metadata)
            }

            console.log("Owned NFTs ===> " ,ownedNFTs);
             
            return ownedNFTs
          } catch (error) {
            console.log("Error fetching NFTs:", error);
            return [];
          }
          finally{
            setIsLoadingNFT(false)
          }
    }

    return(
        <NFTContext.Provider value={{nftCurrency, gemCurrency, isLoadingNFT, fetchNFTsListedForMint, fetchMyNFTs}}>
            {children}
        </NFTContext.Provider>
    )
}