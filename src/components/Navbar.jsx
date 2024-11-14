"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useActiveAccount } from 'thirdweb/react';

import images from "@/assets";
import { ConnectButton } from "thirdweb/react";
import { client, wallets } from "../app/client";
import { darkTheme } from "thirdweb/react";

const MenuItems = ({ isMobile }) => {
    const router = useRouter();
    const pathname = usePathname(); // Get the current path
    const activeAccount = useActiveAccount();
    const walletConnected = !!activeAccount?.address; // Check if wallet is connected

    const handleDashboardClick = () => {
        if (!walletConnected) {
            toast.error("Please connect your wallet");
            return;
        }
        router.push('/dashboard');
    };

    return (
        <ul className={`list-none flexCenter flex-row ${isMobile && 'flex-col h-full'}`}>
            {['Mint', 'Trade', 'Dashboard'].map((item, i) => {
                const linkPath = i === 0 ? '/' : `/${item.toLowerCase()}`;
                const isActive = pathname === linkPath; // Check if the current route matches the link path
                
                return (
                    <li
                        key={i}
                        onClick={() => item === 'Dashboard' ? handleDashboardClick() : router.push(linkPath)}
                        className={`flex flex-row items-center font-poppins font-semibold text-base mx-3 ${isActive ? 'font-bold dark:text-white text-nft-black-1' : 'dark:text-nft-gray-3 text-nft-gray-2'} ${isMobile ? 'mb-4' : ''}`}
                    >
                        {item === 'Dashboard' && !walletConnected ? (
                            <span>{item}</span>
                        ) : (
                            <Link href={linkPath} passHref>
                                {item}
                            </Link>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

const Navbar = () => {
    const { theme, setTheme } = useTheme();
    
    return (
        <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
            <Toaster position="bottom-center" reverseOrder={false} />

            <div className="flex flex-1 flex-row justify-start">
                <Link href="/">
                    <div className="flexCenter cursor-pointer">
                        <Image src={images.logo_} objectFit="contain" width={32} height={32} alt="logo" />
                    </div>
                </Link>
            </div>

            <div className="flex flex-initial flex-row justify-end">
                <div className="flex items-center mr-2">
                    <input
                        type="checkbox"
                        className="checkbox"
                        id="checkbox"
                        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
                    />
                    <label htmlFor="checkbox" className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label">
                        <i className="fas fa-sun" />
                        <i className="fas fa-moon" />
                        <div className="w-3 h-3 absolute bg-white rounded-full ball" />
                    </label>
                </div>

                <div className="md:hidden flex">
                    <MenuItems isMobile={false} />
                    <div className="ml-4">
                        <ConnectButton
                            client={client}
                            wallets={wallets}
                            theme={darkTheme({
                                colors: {
                                    modalBg: "hsl(228, 12%, 8%)",
                                    primaryButtonBg: "linear-gradient(101.12deg,#c99b26 27.35%,#ebe534 99.99%,#ebe534 100%,#ebe534 100%)",
                                },
                            })}
                            connectModal={{
                                size: "compact",
                                titleIcon: "https://i.imgur.com/O3oHFPr.png",
                                showThirdwebBranding: false,
                            }}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
