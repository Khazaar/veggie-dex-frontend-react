// import React from "react";
// import { useContext } from "react";
// import { Subscription } from "rxjs";
// import { SmartContractServiceContext } from "../App";
// import { SmartContractService } from "../services/smart-contract.service";

// export abstract class BaseCard extends React.Component {
//     protected subscriptions: Subscription[] = [];

//     constructor(
//         protected smartContractService: SmartContractService = useContext(
//             SmartContractServiceContext
//         )
//     ) {}
//     ngOnInit(): void {
//         this.subscriptions.push(
//             this.smartContractService.TokenMinted$().subscribe(() => {
//                 this.refresh();
//             })
//         );
//         this.subscriptions.push(
//             this.smartContractService.LiquidityAdded$().subscribe(() => {
//                 this.refresh();
//             })
//         );

//         this.subscriptions.push(
//             this.smartContractService.Swapped$().subscribe(() => {
//                 this.refresh();
//             })
//         );

//         this.subscriptions.push(
//             this.smartContractService.connectService
//                 .walletConnected$()
//                 .subscribe(() => {
//                     this.refresh();
//                 })
//         );

//         this.subscriptions.push(
//             this.smartContractService.MintRevertedPeriod$().subscribe(() => {
//                 this.refresh();
//             })
//         );
//         this.subscriptions.push(
//             this.smartContractService.AdminGranted$().subscribe(async () => {
//                 await this.refresh();
//             })
//         );
//         this.subscriptions.push(
//             this.smartContractService.AdminRevoked$().subscribe(async () => {
//                 await this.refresh();
//             })
//         );
//     }
//     protected abstract refresh(): any;
// }
