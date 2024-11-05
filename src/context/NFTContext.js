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

    return(
        <NFTContext.Provider value={{nftCurrency, gemCurrency}}>
            {children}
        </NFTContext.Provider>
    )
}