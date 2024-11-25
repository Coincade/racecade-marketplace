"use client"
import { NFTContext } from '@/context/NFTContext';
import { useState, useEffect, useContext } from 'react'
import CarCard from '@/components/CarCard';


const CarsToMint = () => {
    const { fetchNFTsListedForMint } = useContext(NFTContext);
    // const [NFTs, setNFTs] = useState([])
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetchNFTsListedForMint().then((items) => {
            setCars(items);
            console.log("cars: ", items);
        })
    }, []);

    
    return (
        <>
        <div className="mt-3 flex flex-wrap justify-start md:justify-center">
            {cars?.map((nft,index) => <CarCard
                key={index}
                nft={nft}
            />)}
        </div>
        </>
    )
}

export default CarsToMint