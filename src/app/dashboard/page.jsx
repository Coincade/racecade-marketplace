"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NFTContext } from "@/context/NFTContext";
import NFTCard from "@/components/NFTCard";
import Banner from "@/components/Banner";
import CurrCard from "@/components/CurrCard";
import { shortenAddress } from "@/utils/shortenAddress";
import Sidebar from "@/components/SideBar";
import { Filter, Loader, LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useActiveAccount } from "thirdweb/react";

import PolygonImage from "@/assets/poly.png";
import GemsImage from "@/assets/Asset 4211x 1.png";
import CoinsImage from "@/assets/Asset 4201x 1.png";

const Dashboard = () => {
  const { fetchMyNFTs, fetchUserBalance, isLoadingNFT } =
    useContext(NFTContext);

  const activeAccount = useActiveAccount();
  const wallet_address = activeAccount?.address;
  const walletConnected = !!activeAccount?.address;
  const router = useRouter();

  const [nfts, setNfts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  const [filter, setFilter] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `https://game-cibqh.ondigitalocean.app/api/public/v0/get-user-data-wrt-walletaddress/${wallet_address}`
      );
      const data = await response.json();
      setUserData(data?.user_data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getUserBalance = async () => {
    if (!wallet_address) return;
    const user_balance = await fetchUserBalance(wallet_address);
    const formattedValue = Number(user_balance / 1e18).toFixed(2);
    setUserBalance(formattedValue);
  };

  React.useEffect(() => {
    if (!walletConnected) {
      toast.error("Please connect your wallet");
      router.push("/"); // Redirect to the mint page if not connected
    } else {
      fetchMyNFTs(wallet_address).then((items) => {
        if (!items || items.length === 0) {
          setNfts([]);
        } else if (filter === "all" || filter === "") {
          setNfts(items); // Show all items if "all" or empty filter is selected
        } else {
          const filteredItems = items.filter(
            (nft) => nft?.attributes?.[0]?.value === filter
          );
          setNfts(filteredItems);
        }
        setIsLoading(false);
      });
      fetchUserData();
      getUserBalance();
    }
  }, [walletConnected, wallet_address, filter]);

  return walletConnected ? (
    <div className="min-h-screen">
      {/* Full-width Banner Section */}
      <div className="w-full flexCenter flex-col">
        <Banner
          name="Your RaceCade Assets"
          childStyles="text-center mb-4"
          parentStyle="h-80 justify-center"
        />
        <div className="flexCenter flex-col -mt-20 z-0">
          <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-1 rounded-full">
            {userData?.img_url?.image_url ? (
              <Image
                src={userData?.img_url.image_url}
                className="rounded-full object-cover"
                alt="Profile image"
                width={900}
                height={900}
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">
            {userData?.username}
          </p>
          {wallet_address && (
            <p className="font-poppins dark:text-slate-500 text-nft-black-1 font-semibold text-lg mt-2">
              {shortenAddress(wallet_address)}
            </p>
          )}
        </div>
      </div>

      {/* Sidebar and Main Content Section */}
      <div className="flex w-full relative">
        {/* Sidebar Section */}
        <div className="w-1/5 bg-[#24252D]  text-white -mt-28">
          <Sidebar
            setFilter={(filter) => {
              console.log(" Filter Set to:", filter);
              setFilter(filter);
            }}
          />
        </div>

        {/* Main Content Section */}
        <div className="w-4/5 flex flex-col items-center ml-auto">
          <div className="flex space-x-4 mt-4">
            <CurrCard
              title="Polygon"
              value={userBalance}
              imageSrc={PolygonImage}
            />
            <CurrCard
              title="Gems"
              value={userData?.currency?.gems}
              imageSrc={GemsImage}
            />
            <CurrCard
              title="Coins"
              value={userData?.currency?.coins}
              imageSrc={CoinsImage}
            />
          </div>

          {!isLoading && !nfts.length ? (
            <div className="flexCenter sm:p-4 p-16">
              <h1 className="font-poppins dark:text-white text-nft-black-1 font-extrabold text-3xl">
                No NFTs Owned
              </h1>
            </div>
          ) : (
            <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
              <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8">
                Search Bar
              </div>
              {isLoadingNFT ? (
                <div className="w-full h-[30dvh] flex items-center justify-center">
                  <Loader className="size-10 animate-spin  dark:bg-gray-800" />
                </div>
              ) : (
                <div className="mt-3 w-full flex flex-wrap">
                  {nfts?.map((nft, index) => (
                    <NFTCard key={index} nft={nft} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default Dashboard;
