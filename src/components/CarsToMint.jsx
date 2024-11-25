"use client";
import { NFTContext } from "@/context/NFTContext";
import { useState, useEffect, useContext } from "react";
import CarCard from "@/components/CarCard";
import { Loader } from "lucide-react";

const CarsToMint = () => {
  const { fetchNFTsListedForMint } = useContext(NFTContext);
  // const [NFTs, setNFTs] = useState([])
  const [cars, setCars] = useState([]);
  const { isLoadingNFT } = useContext(NFTContext);
  useEffect(() => {
    fetchNFTsListedForMint().then((items) => {
      setCars(items);
      console.log("cars: ", items);
    });
  }, []);

  return (
    <>
      {isLoadingNFT ? (
        <div className="w-full h-[30dvh] flex items-center justify-center">
          <Loader className="size-10 animate-spin  dark:bg-gray-800" />
        </div>
      ) : (
        <div className="mt-3 flex flex-wrap justify-start md:justify-center">
          {cars?.map((nft, index) => (
            <CarCard key={index} nft={nft} />
          ))}
        </div>
      )}
    </>
  );
};

export default CarsToMint;
