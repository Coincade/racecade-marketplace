"use client";
import "@rainbow-me/rainbowkit/styles.css";

import Script from "next/script";

import { ThemeProvider } from "next-themes";
import { NFTProvider } from "@/context/NFTContext";
import { ThirdwebProvider } from "thirdweb/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
    <ThirdwebProvider>
        <NFTProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <div className="dark:bg-nft-dark bg-white min-h-screen">
              {children}
            </div>
          </ThemeProvider>
        </NFTProvider>

        <Script
          src="https://kit.fontawesome.com/117e3cae78.js"
          crossorigin="anonymous"
        />
      </ThirdwebProvider>
    </QueryClientProvider>
  );
};
