import { useEffect } from "react";
import { Subscription } from "rxjs";
import { ISmartContractService } from "../services/interfaces/ISmartContract.service";

export const useDexInitSubscription = (
    smartContractService: ISmartContractService,
    setDexInited: React.Dispatch<React.SetStateAction<boolean>>
) => {
    useEffect(() => {
        const subscriptions: Subscription[] = [];
        subscriptions.push(
            smartContractService.DexInited$().subscribe(() => {
                setDexInited(true);
                console.log("DexInited$!!");
            })
        );

        return () => {
            subscriptions.forEach((subscription) => {
                subscription.unsubscribe();
            });
        };
    });
};
