import { createThirdwebClient } from "thirdweb";

import { inAppWallet,createWallet } from "thirdweb/wallets";

export const client = createThirdwebClient({
  clientId: "afd02f81b68f941930a72cae025f333b",
});

export const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "email"],
    },
  }),
  createWallet("io.metamask"),
];