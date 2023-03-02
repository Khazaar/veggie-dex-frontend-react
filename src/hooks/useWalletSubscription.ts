import { useEffect } from "react";
import { Subscription } from "rxjs";
import { ISmartContractService } from "../services/ISmartContract.service";

export const useWalletSubscription = (
    smartContractService: ISmartContractService,
    fetchData: () => Promise<void>
) => {
    useEffect(() => {
        const walletSubscription: Subscription[] = [];
        // Wallet subscriptions
        walletSubscription.push(
            smartContractService.connectService
                .walletConnected$()
                .subscribe((signerAddress) => {
                    fetchData()
                        .then(() => {})
                        .catch((error) => {
                            console.log(error);
                        });
                })
        );

        return () => {
            walletSubscription.forEach((subscription) => {
                subscription.unsubscribe();
            });
        };
    });
};
