import ERC20Potato from "./abi/ERC20Potato.json";
import ERC20Tomato from "./abi/ERC20Tomato.json";
import ERC20Apple from "./abi/ERC20Apple.json";
import ERC20LSR from "./abi/ERC20LSR.json";
import PancakeFactory from "./abi/PancakeFactory.json";
import PancakeRouter_mod from "./abi/PancakeRouter_mod.json";
import PancakePair from "./abi/PancakePair.json";
import { AbiItem } from "web3-utils";
import ethers from "ethers";

export interface ISmartContract {
    nameLong: string;
    nameShort: string;
    address?: IAddress;
    abi: AbiItem[];
    instance?: ethers.Contract;
}
export interface IAddress {
    hardhat: string;
    bsc?: string;
    testnet?: string;
    goerli?: string;
}

export interface IPair {
    name: string;
    address: string;
    abi: AbiItem[];
    instance: ethers.Contract;
    token0: ISmartContract;
    token1: ISmartContract;
    reserve0: BigInt;
    reserve1: BigInt;
}
export const Apple: ISmartContract = {
    nameLong: "ERC20 Apple",
    nameShort: "APL",
    address: {
        hardhat: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
        bsc: "0x8e2eF95D2e027912a6b56ebA9B348BFbe549E48f",
        testnet: "",
        goerli: "0x2757E1767543dCeC9C76ed128d3f8e86d2f3901B",
    },

    abi: ERC20Apple.abi as AbiItem[],
};

export const Potato: ISmartContract = {
    nameLong: "ERC20 Potato",
    nameShort: "PTT",
    address: {
        hardhat: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
        bsc: "0xdc7bB1D8A9094983777075326C1c2aaD92478633",
        testnet: "",
        goerli: "0x54C569b56fbf38C8AC9942b7011a3653e5073FD4",
    },
    abi: ERC20Potato.abi as AbiItem[],
};
export const Tomato: ISmartContract = {
    nameLong: "ERC20 Tomato",
    nameShort: "TMT",
    address: {
        hardhat: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
        bsc: "0x8DFc2072BAFB3C3f7E04863844F2DF5271098320",
        testnet: "",
        goerli: "0x0A41D46f01A8A9EeBdEc130c9a926aFc4a97B6dE",
    },
    abi: ERC20Tomato.abi as AbiItem[],
};

export const LSR: ISmartContract = {
    nameLong: "ERC20 LSR",
    nameShort: "LSR",
    address: {
        hardhat: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
        bsc: "0x8792546F835b29b0fd98E81BABd879Ad74799e3c",
        testnet: "",
        goerli: "0xe0B81076Fa915a280f03bFb746A4F5873578E287",
    },
    abi: ERC20LSR.abi as AbiItem[],
};
export const Factory: ISmartContract = {
    nameLong: "Pancake Factory",
    nameShort: "Pancake Factory",
    address: {
        hardhat: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
        bsc: "0x313b07eE316ca75471B5E8c6Fe2871Da1eE9EE04",
        testnet: "",
        goerli: "0xB48475F43de9BF5Fcd2fce228F74F9B5F80E73F6",
    },
    abi: PancakeFactory.abi as AbiItem[],
};
export const Pair: ISmartContract = {
    nameLong: "Pancake Pair",
    nameShort: "Pancake Pair",
    // address: {
    //     hardhat: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
    //     bsc: "0xC397F13E62e731FaD634EF472De2371124191793",
    //     testnet: "",
    //     goerli: "0xEaa96e643d817D7DE691D8992d7535aaD458c6DD",
    // },
    abi: PancakePair.abi as AbiItem[],
};
export const Router_mod: ISmartContract = {
    nameLong: "Router_mod",
    nameShort: "Router_mod",
    address: {
        hardhat: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
        bsc: "0x912561d45a2ef38395683Cc8bf4fb6cDeb2dDd2E",
        testnet: "",
        goerli: "0x7d29E9366C3022F30a8fd72ef59CaC95BC9e8B72",
    },
    abi: PancakeRouter_mod.abi as AbiItem[],
};
