"use client";
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
import Horizontal from "@/assets/Rectangle 3257.png";
import Horizontal1 from "@/assets/Rectangle 3256.png";
import Horizontal3 from "@/assets/Rectangle 3258.png";
import Horizontal4 from "@/assets/Rectangle 3259.png";
import Horizontal5 from "@/assets/Rectangle 3260.png";
import ProfileBanner from "@/assets/ProfileBanner.png";
import toast, { Toaster } from "react-hot-toast";

import { useActiveAccount } from "thirdweb/react";
import { ethers } from "ethers";
import { market_abi, market_address } from "@/context/constants";

const page = () => {
  const activeAccount = useActiveAccount();
  const wallet_address = activeAccount?.address;

  const { currentAccount } = useContext(NFTContext);
  const [isLoading, setIsLoading] = useState(true);
  const [nftData, setNftData] = useState(null);
  const [ownerAddress, setOwnerAddress] = useState("");
  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
    description: "",
  });

  const { fetchMyNFTs, ownedNFTs, fetchNFTDataById, fetchOwnerOfNFT } =
    useContext(NFTContext);

  const router = useRouter();
  const searchParams = useSearchParams();
  const walletConnected = !!activeAccount?.address;

  const getNFTData = async () => {
    try {
      const nft_data = await fetchNFTDataById(
        Number(searchParams.get("tokenId"))
      );
      setNftData(nft_data);
    } catch (error) {
      return {};
    }
  };

  const setOwnedUser = async () => {
    try {
      const owner_data = await fetchOwnerOfNFT(
        Number(searchParams.get("tokenId"))
      );
      console.log("owner_data:", owner_data);
      setOwnerAddress(owner_data);
    } catch (error) {
      return "Owner not Found";
    }
  };

  

  useEffect(() => {
    getNFTData();
    setNft({
      image: searchParams.get("image"),
      tokenId: searchParams.get("tokenId"),
      name: searchParams.get("name"),
      owner: searchParams.get("owner"),
      price: searchParams.get("price"),
      seller: searchParams.get("seller"),
      description: searchParams.get("description"),
    });

    setOwnedUser();

    if (currentAccount) fetchMyNFTs(currentAccount);

    setIsLoading(false);
  }, [currentAccount, fetchMyNFTs, searchParams]);

  if (isLoading) {
    return (
      <div className="h-[100dvh] w-full flex items-center justify-center">
        <LoaderIcon className="animate-spin w-20 h-20" />
      </div>
    );
  }

  console.log("nftData", nftData);

  const attributeValue = nftData?.attributes?.[0]?.value || null;

  let displayImage = null;
  if (attributeValue === "F") {
    displayImage = Horizontal;
  } else if (attributeValue === "A") {
    displayImage = Horizontal4;
  } else if (attributeValue === "B") {
    displayImage = Horizontal1;
  } else if (attributeValue === "S") {
    displayImage = Horizontal3;
  } else if (attributeValue === "C") {
    displayImage = Horizontal5;
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
        <div className="p-4">
          <Image
            src={nft.image}
            alt="NFT Image"
            width={600}
            height={600}
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* Car Data Div */}
        <div className="px-4 py-10  pt-10 flex flex-col justify-between">
          <div className="flex flex-row">
            {displayImage ? (
              <Image
                src={displayImage}
                alt="Horizontal Scroll Image"
                width={10}
                height={10}
              />
            ) : (
              <p className=""></p>
            )}

            <div className=" flex flex-col ml-2">
              <h1 className="text-4xl font-bold font-poppins ">{nft.name}</h1>
              {ownerAddress?.toLowerCase().toString() ===
              wallet_address?.toLowerCase().toString() ? (
                <p className="font-poppins"> Owned by You</p>
              ) : (
                <p className="font-poppins">
                  {" "}
                  Owned by {shortenAddress(ownerAddress)}
                </p>
              )}
            </div>
          </div>

          <div className=" flex flex-row w-96 h-52  justify-between  pt-5">
            <Cards title="type" value={nftData?.attributes[1].value} />
            <Cards title="level" value={nftData?.car_level} />
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

          <div className="space-y-2">
            <p>BIO: {nftData?.description}</p>
            <p>Price: X POL</p>
          </div>

          <div className="flex justify-center mt-4">
            {ownerAddress?.toLowerCase().toString() ===
            wallet_address?.toLowerCase().toString() ? (
              <Button btnName="List" classStyles="w-[60%] hover:scale-[1.05] transition-all"  handleClick={() => {}}/>
            ) : (
              <Button btnName="Buy" classStyles="w-[60%]" handleClick={() => {}}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
