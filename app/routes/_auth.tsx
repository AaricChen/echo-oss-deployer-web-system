import { Outlet } from "react-router";
import { appConfig } from "~/configs/app";

import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, type AppKitNetwork } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import Logo from "~/assets/logo.png";

const reownProjectId = "ce7a1f8e4c1b8e1b490e2b4a33f509a5";
const reownMetadata = {
  name: appConfig.name,
  description: appConfig.description,
  url: appConfig.url,
  icons: [Logo],
};
const networks = [mainnet] as [AppKitNetwork, ...AppKitNetwork[]];
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId: reownProjectId,
  ssr: false,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId: reownProjectId,
  metadata: reownMetadata,
});

export default function Auth() {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center bg-white"
      style={{
        backgroundImage: `url(${appConfig.loginBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <WagmiProvider config={wagmiAdapter.wagmiConfig}>
        <Outlet />
      </WagmiProvider>
    </div>
  );
}
