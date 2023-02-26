import { useEffect } from "react";
import { Subscription } from "rxjs";
import { ISmartContractService } from "../services/interfaces/ISmartContract.service";

export const useWalletSubscription = (
    smartContractService: ISmartContractService,
    fetchData: () => Promise<void>
) => {
    useEffect(() => {
        const subscriptions: Subscription[] = [];
        // Wallet subscriptions
        subscriptions.push(
            smartContractService.connectService
                .walletConnected$()
                .subscribe((signerAddress) => {
                    fetchData()
                        .then(() => {
                            console.log("Wallet connected: ", signerAddress);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
        );

        return () => {
            subscriptions.forEach((subscription) => {
                subscription.unsubscribe();
            });
        };
    });
};
