import { useEffect } from "react";

export const useRefresh = (
    smartContractService: any,
    fetchData: () => Promise<void>
) => {
    useEffect(() => {
        smartContractService.TokenMinted$().subscribe(() => {
            fetchData().catch((error) => {
                console.log(error);
            });
        });

        smartContractService.LiquidityAdded$().subscribe(() => {
            fetchData().catch((error) => {
                console.log(error);
            });
        });

        smartContractService.Swapped$().subscribe(() => {
            fetchData().catch((error) => {
                console.log(error);
            });
        });

        smartContractService.connectService.walletConnected$().subscribe(() => {
            fetchData().catch((error) => {
                console.log(error);
            });
        });

        smartContractService.MintRevertedPeriod$().subscribe(() => {
            fetchData().catch((error) => {
                console.log(error);
            });
        });

        smartContractService.AdminGranted$().subscribe(async () => {
            fetchData().catch((error) => {
                console.log(error);
            });
        });

        smartContractService.AdminRevoked$().subscribe(async () => {
            fetchData().catch((error) => {
                console.log(error);
            });
        });
    });
};

// fetchData().catch((error) => {
//     console.log(error);
// });
