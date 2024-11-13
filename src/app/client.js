import { createThirdwebClient } from "thirdweb";

import { inAppWallet,createWallet } from "thirdweb/wallets";

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_ENV === "prod" ? process.env.NEXT_PUBLIC_PROD_THIRDWEB_CLIENT_ID : process.env.NEXT_PUBLIC_DEV_THIRDWEB_CLIENT_ID
});

export const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "email"],
    },
  }),
  createWallet("io.metamask"),
];