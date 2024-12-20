"use client";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Star from "@/assets/Star 2.png";
import WhiteStar from "@/assets/Star 5.png";
import { NFTContext } from "@/context/NFTContext";
import Button from "./Button";
// import { NFTFilter, useNFTFilter } from "@/context/NFTFilter";

const NFTCard = ({ nft }) => {
  const { nftCurrency } = useContext(NFTContext);

  //   const { updateFilter } = useNFTFilter();

  const stars = Array.from({ length: 5 }, (_, index) => (
    <Image
      key={index}
      src={index < nft.car_level ? Star : WhiteStar} // Render filled or empty stars based on carLevel
      alt="Star"
      width={20}
      height={20}
    />
  ));

  console.log(`nft data in card-->`, nft);

  return (
    <Link href={{ pathname: "/nft-details", query: nft }}>
      <div className="flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md">
        <div className="flex justify-center">{stars}</div>
        <div className="relative w-full h-52 sm:h-36 xs:h-56 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
          <Image
            src={nft?.image}
            layout="fill"
            objectFit="contain"
            alt={nft?.name || "no"}
          />
        </div>
        <div className="mt-3 flex justify-between items-center">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
            {nft?.name}
          </p>

          <div>
            <Button
              btnName="List"
              classStyles="rounded-md dark:text-nft-black-1 hover:scale-105 transition-all"
              handleClick={() => {}}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
