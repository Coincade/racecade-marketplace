"use client"

import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { useRouter,useSearchParams } from 'next/navigation';

import { NFTContext } from '@/context/NFTContext'
import NFTCard from '@/components/NFTCard'
import Banner from '@/components/Banner'
import images from "@/assets"
import { shortenAddress } from '@/utils/shortenAddress'
import { LoaderIcon } from 'lucide-react'
import Bannerr from '@/components/Banner';


const page = () => {

    const {currentAccount} = useContext(NFTContext)
    const [isLoading, setIsLoading] = useState(true)
    const [nft, setNft] = useState({image: '', tokenId: '', name: '', owner:'', price:'', seller:''})

    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        
        setNft({
            image: searchParams.get("image"),
            tokenId: searchParams.get("tokenId"),
            name: searchParams.get("name"),
            owner: searchParams.get("owner"),
            price: searchParams.get("price"),
            seller: searchParams.get("seller"),
        });
        console.log("NFT ===> ",nft);
        
        setIsLoading(false);

    },[])

    if(isLoading) return <div className='h-[100dvh] w-full flex items-center justify-center'><LoaderIcon  className='animate-spin w-20 h-20'/>
    </div>

  return (
    <div className='relative flex justify-center md:flex-col min-h-screen '>
        <div className='relative flex-1 flexCenter sm:px-4 p-12 border-r md:border-r-0 md:border-b dark:border-nft-black-1 border-nft-gray-1'>      
            <div>
                <Image src={nft.image} objectFit='cover' className='rounded-xl shadow-lg' layout='fill' alt='nft-image'/>
            </div>
         </div>
         <div className=' relative flex-1 z-10  flex-col items-start mt-[4.7rem] p-4'>         
         <h1 className='text-4xl text-white font-poppins '>Car Name</h1>
        <div className='space-y-5 mt-5 text-white  '>
          <p><strong>Speed:</strong> </p>
          <p><strong>Acceleration:</strong> </p>
          <p><strong>Handling:</strong></p>
          <p><strong>Bio:</strong></p>

        </div>
             </div>
    </div>


 
  )
}

export default page