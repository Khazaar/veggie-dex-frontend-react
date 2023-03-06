import { BigNumber, ethers } from "ethers";
export interface INetwork {
    nameShort: string;
    nameLong: string;
    nativeToken: string;
    gasPrice?: BigNumber;
    gasLimit?: BigNumber;
    id?: number;
}
export const Hardhat: INetwork = {
    nameShort: "hardhat",
    nameLong: "Hardhat local",
    nativeToken: "Hardhat ETH",
    gasPrice: ethers.utils.parseUnits("20", "gwei"),
    id: 31337,
};
export const BSC: INetwork = {
    nameShort: "bsc",
    nameLong: "Binance Smart Chain",
    nativeToken: "Testnet BNB",
    gasPrice: ethers.utils.parseUnits("20", "gwei"),
    id: 97,
};
export const Testnet: INetwork = {
    nameShort: "testnet",
    nameLong: "Etherium testnet",
    nativeToken: "Testnet ETH",
};

export const Goerli: INetwork = {
    nameShort: "goerli",
    nameLong: "Goerli",
    nativeToken: "Goerli ETH",
};

export const Sepolia: INetwork = {
    nameShort: "sepolia",
    nameLong: "Sepolia",
    nativeToken: "SepETH",
    gasPrice: ethers.utils.parseUnits("20", "gwei"),
    id: 11155111,
};
