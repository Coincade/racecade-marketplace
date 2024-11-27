"use client";

import React, { useContext, useEffect, useState, useSearchParams } from "react";
import { NFTContext } from "@/context/NFTContext";
import CarCard from "@/components/CarCard";

import { Loader } from "lucide-react";

const Trade = () => {
  const { fetchListedNFTs, setIsLoadingNFT, fetchNFTDataById } =
    useContext(NFTContext);
  const [marketplaceData, setMarketplaceData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchListedNFTs();
        if (data) {
          setMarketplaceData(data);
        } else {
          console.log("No data is returned from marketplace ");
        }
      } catch (err) {
        console.error(" Error fetching data from marketplace ", err);
        setError(err.message || "An error occurred");
      }
    };
    fetchData();
  }, []);

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

    <>
      {setIsLoadingNFT ? (
        <div className="w-full h-[30dvh] flex items-center justify-center">
          <Loader className="size-10 animate-spin  dark:bg-gray-800" />
        </div>
      ) : (
        <div className="mt-3 flex flex-wrap justify-start md:justify-center">
          {marketplaceData?.map((nft, index) => (
            <CarCard key={index} nft={nft} />
          ))}
        </div>
      )}
    </>
  );
};

export default Trade;
