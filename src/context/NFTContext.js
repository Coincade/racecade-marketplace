"use client"
import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
import axios from "axios"

import { nft_address, market_address, nft_abi, market_abi } from "./constants"

export const NFTContext = React.createContext();

const fetchNftContract = (signerOrProvider) => new ethers.Contract(nft_address, nft_abi, signerOrProvider);
const fetchMarketContract = (signerOrProvider) => new ethers.Contract(market_address, market_abi, signerOrProvider);

export const NFTProvider = ({ children }) => {
    const nftCurrency = 'POL';
    const gemCurrency = 'GEM';

    const [isLoadingNFT, setIsLoadingNFT] = useState(false);

    const fetchNFTsListedForMint = async () => {
        const { data: { car_data } } = await axios.get("https://game-cibqh.ondigitalocean.app/api/private/v0/all-cars-fetch");

        const filteredData = []
        for (let i = 0; i < car_data.length; i++) {
            if (car_data[i].is_nft_listed_for_mint) {
                filteredData.push(car_data[i])
            }
        }

        return filteredData;
    }

    return(
        <NFTContext.Provider value={{nftCurrency, gemCurrency, fetchNFTsListedForMint}}>
            {children}
        </NFTContext.Provider>
    )
}