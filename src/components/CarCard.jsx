"use client"
import { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { NFTContext } from '@/context/NFTContext'
import Button from './Button'

const CarCard = ({ nft }) => {
    const { gemCurrency } = useContext(NFTContext);
    return (
        <Link href={{ pathname: "/car-details", query: nft }}>
            <div className="flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md">
                <div className="relative w-full h-52 sm:h-36 xs:h-56 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
                    <Image src={nft.image || "https://racecade-cars.blr1.cdn.digitaloceanspaces.com/1_Ruti_Zeno.png"} layout="fill" objectFit="cover" alt="nft-image" />
                </div>
                <div className='mt-3 flex justify-between'>
                    <div className='flex flex-col'>
                        <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl'>{nft.car_name}</p>
                        <div className='flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3'>
                            <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg'>{nft.car_price} <span className='normal'>{gemCurrency}</span></p>
                            {/* <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg'>{nft.seller > 10 ? shortenAddress(nft.seller) : nft.seller}</p> */}
                        </div>
                    </div>
                    <div>
                        <Button btnName="Buy" classStyles="rounded-md dark:text-nft-black-1 hover:scale-105 transition-all" handleClick={() => {}}/>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CarCard