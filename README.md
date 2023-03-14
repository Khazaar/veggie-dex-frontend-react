# Veggie dex project information

Veggie dex is a Web3 app - Uniswap v2 fork decentralized exchange with 4 listed ERC-20 tokens: Apple (APL), Potato (PTT), Tomato(TMT) and LSR. Supported networks are: Sepolia, BSC Testnet and Hardhat Local.

## Getting Started

Pleace, connect your wallet to the DEX and select the network to get access to User features and DEX functionality.

## Basic features

To start interacting with DEX for the first time user can mint some listed tokens in the "Mint tokens" section. The balance of listed tokens is shown in the "User assets" section. Users can mint only a limited amount of tokens in an assigned period. These limitations could be changed by the smart contract Owner.

## Advanced features

PancakeRouter_mod smart contract can have an Admin, who can set the transfer fee, withdraw the transfer fee set the required LSR amount to avoid paying a trading fee. Admin role could be assigned or revoked by the Owner.

You can become a liquidity provider by adding liquidity to a corresponding pair in the "Add liquidity" section. Swap tokens feature is available in the "Swap" section

All available liquidity pools with corresponding reserves are shown in the "Liquidity pools" section

## Usefull links

Smart contracts of this DEX could be found in the corresponding GitHub repository with the Hardhat project:
https://github.com/Khazaar/pancake-router
You can use this project to connect this Web3 app to the Hardhat Local network.
