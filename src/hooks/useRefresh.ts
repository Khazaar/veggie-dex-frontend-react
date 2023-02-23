import { useEffect } from "react";
import { ISmartContractService } from "../services/ISmartContractService";

export const useRefresh = (
    smartContractService: ISmartContractService,
    fetchData: () => Promise<void>
) => {
    useEffect(() => {
        smartContractService.TokenMinted$().subscribe(() => {
            fetchData()
                .then(() => {})
                .catch((error) => {
                    console.log(error);
                });
        });

        smartContractService.LiquidityAdded$().subscribe(() => {
            fetchData()
                .then(() => {
                    console.log("LiquidityAdded$");
                })
                .catch((error) => {
                    console.log(error);
                });
        });

        smartContractService.Swapped$().subscribe(() => {
            fetchData()
                .then(() => {})
                .catch((error) => {
                    console.log(error);
                });
        });

        smartContractService.connectService.walletConnected$().subscribe(() => {
            fetchData()
                .then(() => {})
                .catch((error) => {
                    console.log(error);
                });
        });

        smartContractService.MintRevertedPeriod$().subscribe(() => {
            fetchData()
                .then(() => {})
                .catch((error) => {
                    console.log(error);
                });
        });

        smartContractService.AdminGranted$().subscribe(async () => {
            fetchData()
                .then(() => {})
                .catch((error) => {
                    console.log(error);
                });
        });

        smartContractService.AdminRevoked$().subscribe(async () => {
            fetchData()
                .then(() => {})
                .catch((error) => {
                    console.log(error);
                });
        });
    });
};

// fetchData().catch((error) => {
//     console.log(error);
// });
