"use client"

import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { NFTContext } from '@/context/NFTContext'
import NFTCard from '@/components/NFTCard'
import Banner from '@/components/Banner'
import CurrCard from '@/components/CurrCard';
import { shortenAddress } from '@/utils/shortenAddress'
import { LoaderIcon } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast';
import { useActiveAccount } from "thirdweb/react";
import PolygonImage from "@/assets/poly.png";
import GemsImage from "@/assets/Asset 4211x 1.png";
import CoinsImage from "@/assets/Asset 4201x 1.png";


const Dashboard = () => {
    const { fetchMyNFTs } = useContext(NFTContext)

    const activeAccount = useActiveAccount();
    const wallet_address = activeAccount?.address;
    const walletConnected = !!activeAccount?.address;
    const router = useRouter();
    const [nfts, setNfts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null)

    

    useEffect(() => {
        if (!walletConnected) {
            toast.error("Please connect your wallet");
            router.push('/'); // Redirect to the mint page if not connected
        }
    }, [walletConnected, router]);
    


    // useEffect(() => {
    //     console.log("Hellooo");
    //     console.log(" wallet address==>", wallet_address)
    //     const fetchuserImage =  async () => {
    //         try {
    //             const response = await fetch(`https://game-cibqh.ondigitalocean.app/api/public/v0/get-user-data-wrt-walletaddress=${wallet_address}`)
    //             const data = await response.json()
    //             setUserData(data?.user_data)
    //             console.log(" Fetch user Data", data);
                
    //         } catch (error) {
    //             console.log("Error Fetching fetchuserImage ===> ", fetchuserImage)
    //         }
    //     }
       
    // })
    const fetchUserData = async () => {
             console.log("wallet address:", wallet_address);
             
        try {
            const response = await fetch(
                `https://game-cibqh.ondigitalocean.app/api/public/v0/get-user-data-wrt-walletaddress/${wallet_address}`
            );
            const data = await response.json();
            setUserData(data?.user_data);
            console.log("Fetched user data:", data);
        } catch (error) {
            console.log("Error fetching user data:", error);
        }
    };


    useEffect(() => {
        fetchMyNFTs(wallet_address).then((items) => {
            setNfts(items);
            
            setIsLoading(false)
        });
        fetchUserData();

       
    }, [wallet_address]);


    if (isLoading) {
        return (
            <div className='flexStart min-h-screen'>
                <LoaderIcon className='animate-spin'/>
            </div>
        )
    }


  return walletConnected ? (
    <div className='w-full flex justify-start items-center flex-col min-h-screen'>

    <div className='w-full flexCenter flex-col'>
        <Banner
            name="Your RaceCade Assets"
            childStyles="text-center mb-4"
            parentStyle="h-80 justify-center"
        />
        <div className='flexCenter flex-col -mt-20 z-0'>
            <div className='flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-1 rounded-full'>
                {userData?.img_url.image_url ? (
                    <Image
                    // src={images.creator1}
                    src={userData?.img_url.image_url}
                    className='rounded-full object-cover'
                    objectFit='cover'
                    alt='Profile image'
                    width={900} 
                   height={900} 
                />
                ):(
                    <p> No image available</p>
                ) }
              
            </div>
              <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6'> {userData?.username}</p>
            {wallet_address &&
            <p className='font-poppins dark:text-slate-500 text-nft-black-1 font-semibold text-lg mt-2'>{shortenAddress(wallet_address)}</p>
            }
        </div>
    </div>


    <div className="flex space-x-4">
      <CurrCard title="Polygon" value= "Value" imageSrc={PolygonImage} />
      <CurrCard title="Gems" value= {userData?.currency.gems} imageSrc={GemsImage} />
      <CurrCard title="Coins" value= {userData?.currency.coins} imageSrc={CoinsImage} />
    </div>

    {!isLoading && !nfts.length ? (
        <div className='flexCenter sm:p-4 p-16'>
            <h1 className='font-poppins dark:text-white text-nft-black-1 font-extrabold text-3xl'>No NFTs Owned</h1>
        </div>
    )
        :
        <div className='sm:px-4 p-12 w-full minmd:4/5 flexCenter flex-col'>
            <div className='flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8'>Search Bar</div>
            {wallet_address ?
            <div className='mt-3 w-full flex flex-wrap'>
                {nfts?.map((nft,index) => <NFTCard key={index} nft={nft} />)}
            </div> 
            :
            <div className='mt-5 w-full flex flex-wrap items-center justify-center h-full'>
                <p className='text-3xl font-bold'>Connect Wallet to view you NFTs</p>
            </div>
            }
        </div>
    }
</div>
  ) : null
}

export default Dashboard