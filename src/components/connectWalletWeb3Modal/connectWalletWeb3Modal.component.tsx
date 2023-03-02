import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";
import { ProfileComponent } from "../profile/connectWalletWeb3Modal.component";

export const ConnectWalletWeb3ModalComponent = () => {
    const client = createClient({
        autoConnect: true,
        provider: getDefaultProvider(),
    });

    return (
        <WagmiConfig client={client}>
            <ProfileComponent />
        </WagmiConfig>
    );
};
