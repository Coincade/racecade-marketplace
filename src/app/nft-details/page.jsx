"use client"
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { NFTContext } from "@/context/NFTContext";
import NFTCard from "@/components/NFTCard";
import Banner from "@/components/Banner";
import images from "@/assets";
import { shortenAddress } from "@/utils/shortenAddress";
import { LoaderIcon } from "lucide-react";
import Bannerr from "@/components/Banner";
import ProgressBar from "@/components/ProgressBar";
import Button from "@/components/Button";

const page = () => {
  const { currentAccount } = useContext(NFTContext);
  const [isLoading, setIsLoading] = useState(true);
  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setNft({
      image: searchParams.get("image"),
      tokenId: searchParams.get("tokenId"),
      name: searchParams.get("name"),
      owner: searchParams.get("owner"),
      price: searchParams.get("price"),
      seller: searchParams.get("seller"),
    });
    console.log("NFT ===> ", nft);

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="h-[100dvh] w-full flex items-center justify-center">
        <LoaderIcon className="animate-spin w-20 h-20" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 min-h-screen gap-4">
      {/* Image Div */}
      <div className="p-4 border-2">
        <Image
          src={nft.image}
          alt="NFT Image"
          width={800}
          height={700}
          className="rounded-xl shadow-lg"
        />
      </div>

      {/* Car Data Div */}
      <div className="p-4 border-2 pt-20">
        <h1 className="text-4xl font-bold font-poppins ">Car Name</h1>
        <p className=" font-poppins">Owned by xyzz</p>

        <div className="space-y-4 mt-4">
          <div className="flex items-center">
            <ProgressBar title="Speed" value={50} />
          
          </div>
          <div className="flex items-center">
            <ProgressBar title="Acceleration" value={80} />
       
          </div>
          <div className="flex items-center">
            <ProgressBar title="Handling" value={20} />
       
          </div>
          <p>Bio:</p>
          <p>Price:</p>
        </div>

        <div className="flex justify-end mt-4">
          <Button btnName="List" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
        </div>
      </div>
    </div>
  );
};

export default page;