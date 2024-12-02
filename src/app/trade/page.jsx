"use client";

import React, { useContext, useEffect, useState } from "react";
import { NFTContext } from "@/context/NFTContext";
import CarCard from "@/components/CarCard";
import { useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";
import NFTCard from "@/components/NFTCard";
import Sidebar from "@/components/SideBar";
import Banner from "@/components/Banner";

const Trade = () => {
  const { fetchListedNFTs, setIsLoadingNFT, fetchNFTDataById,isLoadingNFT } =
    useContext(NFTContext);
  const [marketplaceData, setMarketplaceData] = useState([]);
  const [nftData, setNftData] = useState([]);
  const [error, setError] = useState(null);
 

  const searchParams = useSearchParams();

  useEffect(() => {
    // setNftData({
    //   image: searchParams.get("image"),
    //   tokenId: searchParams.get("tokenId"),
    //   name: searchParams.get("name"),
    //   owner: searchParams.get("owner"),
    //   price: searchParams.get("price"),
    //   seller: searchParams.get("seller"),
    //   description: searchParams.get("description"),
    // });
    // const fetchData = async () => {
    //   try {
    //     const data = await fetchListedNFTs();
    //     if (data) {
    //       console.log(" data from trade =>>>", data);
    //       setMarketplaceData(data);
    //     } else {
    //       console.log("No data is returned from marketplace ");
    //     }
    //   } catch (err) {
    //     console.error(" Error fetching data from marketplace ", err);
    //     setError(err.message || "An error occurred");
    //   }
    // };
    // fetchData();
    getMarketplace();
  }, []);

  const getMarketplace = async () => {
    const data = await fetchListedNFTs();
    console.log(data);

    const allMetaData = [];

    for (let i = 0; i < data.length; i++) {
      try {
        const market_data = await fetchNFTDataById(Number(data[i].tokenId));
        console.log("Token ID==>", Number(data[i].tokenId));

        const datamarket = {...market_data, tokenId: Number(data[i].tokenId) }

        allMetaData.push(datamarket);
        console.log("Market Car Data", datamarket);
      } catch (error) {
        return console.log("errrr", error);
      }
    }
    setNftData(allMetaData);
    console.log(" All metaData ==>", allMetaData);
  };

  return (
    // <div className="pt-10">
    //   <h1>Trade Page</h1>
    //   {setIsLoadingNFT && <p>Loading NFTs...</p>}
    //   {error && <p>Error: {error}</p>}
    //   <div>
    //     {marketplaceData.length > 0 ? (
    //       marketplaceData.map((nft, index) => (
    //         <div key={index}>
    //           <p>
    //             NFT {index + 1}: {JSON.stringify(nft)}
    //           </p>
    //         </div>
    //       ))
    //     ) : (
    //       <p>No NFTs found.</p>
    //     )}
    //   </div>
    // </div>

    <div className=" border-2 min-h-screen  ">
      {/* <Sidebar /> */}
      <Banner
        name="Your RaceCade Assets"
        childStyles="text-center mb-4"
        parentStyle="h-80 justify-center"

      />

     <div className=" border border-red-500 grid grid-cols-4 ">

     <Sidebar/>
     <div className=" border border-pink-400 ">
      {isLoadingNFT ? (
        <div className="w-full h-[30dvh] flex items-center justify-center  ">
          <Loader className="size-10 animate-spin  dark:bg-gray-800 " />
        </div>
      ) : (
        <div className="mt-3 flex flex-wrap justify-start md:justify-center border-white ">
          <div className=" flex "> </div>
          {nftData?.map((nft, index) => (
            <NFTCard key={index} nft={nft} />
          ))}
        </div>
      )}
      </div>
      </div>
    </div>
  );
};

export default Trade;
