"use client"

import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'

import { NFTContext } from '@/context/NFTContext'
import NFTCard from '@/components/NFTCard'
import Banner from '@/components/Banner'
import images from "@/assets"
import { shortenAddress } from '@/utils/shortenAddress'
import { LoaderIcon } from 'lucide-react'

const Dashboard = () => {
    const { fetchMyNFTs } = useContext(NFTContext)
    const address = "0x22b050A44a6CF5cA741FD4a887DE244E4a88661D"

    const [nfts, setNfts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchMyNFTs().then((items) => {
            setNfts(items);
            
            setIsLoading(false)
        });
    }, []);

    if (isLoading) {
        return (
            <div className='flexStart min-h-screen'>
                <LoaderIcon className='animate-spin'/>
            </div>
        )
    }

  return (
    <div className='w-full flex justify-start items-center flex-col min-h-screen'>
    <div className='w-full flexCenter flex-col'>
        <Banner
            name="Your RaceCade Assets"
            childStyles="text-center mb-4"
            parentStyle="h-80 justify-center"
        />
        <div className='flexCenter flex-col -mt-20 z-0'>
            <div className='flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-1 rounded-full'>
                <Image
                    src={images.creator1}
                    className='rounded-full object-cover'
                    objectFit='cover'
                    alt='Profile image'
                />
            </div>
            <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6'>{shortenAddress(address)}</p>
        </div>
    </div>

    {!isLoading && !nfts.length ? (
        <div className='flexCenter sm:p-4 p-16'>
            <h1 className='font-poppins dark:text-white text-nft-black-1 font-extrabold text-3xl'>No NFTs Owned</h1>
        </div>
    )
        :
        <div className='sm:px-4 p-12 w-full minmd:4/5 flexCenter flex-col'>
            <div className='flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8'>Search Bar</div>
            <div className='mt-3 w-full flex flex-wrap'>
                {nfts?.map((nft,index) => <NFTCard key={index} nft={nft} />)}
            </div>
        </div>
    }
</div>
  )
}

export default Dashboard