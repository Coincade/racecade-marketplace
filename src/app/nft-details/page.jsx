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
// import ProgressBar from "@/components/ProgressBar";
import Button from "@/components/Button";
import Cards from "@/components/Cards";
import Horizontal from "@/assets/Rectangle 3257.png"
import Horizontal1 from "@/assets/Rectangle 3256.png";
import Horizontal2 from "@/assets/Rectangle 3257.png";
import Horizontal3 from "@/assets/Rectangle 3258.png";
import Horizontal4 from "@/assets/Rectangle 3259.png";
import Horizontal5 from "@/assets/Rectangle 3260.png";

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
    description:""
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
      description: searchParams.get("description")
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

  
    <div className="flex flex-col min-h-screen">
    {/* Banner Section */}
   
    <Banner
            name="Your RaceCade Assets"
            childStyles="text-center mb-4"
            parentStyle="h-80 justify-center"
        />

    {/* Main Content Grid */}
    <div className="grid grid-cols-2 gap-4 p-8 ">
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
      <div className="p-4 border-2 pt-10">
        <div className="flex flex-row">
        <Image
        src={Horizontal}
        alt="This is Horizontal srcoll"
        width={10}
        height={10}
        />
       
        <div className=" flex flex-col ml-2">
        <h1 className="text-4xl font-bold font-poppins ">{nft.name}</h1>
        <p className="font-poppins"> Owned by { nft.owner}</p>
        </div>
        </div>
      
        <div className=" flex flex-row">
           <Cards title="type" value="xyz"/>
           <Cards title="level" value= "guk"/>
        </div>
        
        {/* {Progress Bar} */}

        {/* <div className="space-y-4 mt-4">
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
        </div> */}




        <div className="flex justify-end mt-4">
          <Button
            btnName="List"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          />
        </div>
      </div>
    </div>
  </div>
  );
};

export default page;