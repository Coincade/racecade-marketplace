"use client"
import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,
    RainbowKitProvider,
    lightTheme
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    polygon,
    polygonAmoy
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import Script from 'next/script'

import { ThemeProvider } from "next-themes";
import { NFTProvider } from '@/context/NFTContext';
import { ThirdwebProvider } from 'thirdweb/react'


// const project_id = process.env.NEXT_PUBLIC_PROJECT_ID

const config = getDefaultConfig({
    appName: 'racecade-marketplace',
    projectId: "1db1e1b18a80749ad384a48d1eafe11e",
    chains: [polygon, polygonAmoy],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();



export const Providers = ({ children }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={lightTheme({
                    accentColor: '#C99B26',
                    accentColorForeground: 'white',
                    borderRadius: 'large',
                    // fontStack: 'system',
                    // overlayBlur: 'small',
                })}>
                    <ThirdwebProvider>
                    <NFTProvider>
                    <ThemeProvider attribute='class' defaultTheme='dark'>
                    <div className='dark:bg-nft-dark bg-white min-h-screen'>
                        {children}
                    </div>
                    </ThemeProvider>
                    </NFTProvider>

                    <Script src="https://kit.fontawesome.com/117e3cae78.js" crossorigin="anonymous" />
                    </ThirdwebProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}