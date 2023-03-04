import ethers, { BigNumber } from "ethers";
import { ERC20Basic, PancakePair } from "./types";

export interface ITokenContract {
    nameLong: string;
    nameShort: string;
    address?: IAddress;
    instance?: ERC20Basic;
}
export interface IAddress {
    hardhat: string;
    bsc: string;
    goerli: string;
    sepolia: string;
}

export interface IPair {
    name: string;
    address?: string;
    instance?: PancakePair;
    token0?: ITokenContract;
    token1?: ITokenContract;
    reserve0?: BigNumber;
    reserve1?: BigNumber;
}
export const Apple: ITokenContract = {
    nameLong: "ERC20 Apple",
    nameShort: "APL",
    address: {
        hardhat: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
        bsc: "0xEE62EFE7E75FE11e508F8FeA1A9cC71fF3E5990a",
        goerli: "0x2757E1767543dCeC9C76ed128d3f8e86d2f3901B",
        sepolia: "0xF3B0Bf3cdC24ae7d9FC7Df08B98E2a3d30071b8f",
    },
};

export const Potato: ITokenContract = {
    nameLong: "ERC20 Potato",
    nameShort: "PTT",
    address: {
        hardhat: "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0",
        bsc: "0xBbDf268b28386a5D178571788d8fa669DB2f69bC",
        goerli: "0x54C569b56fbf38C8AC9942b7011a3653e5073FD4",
        sepolia: "0x4075B23f1D93e99439eC078BB3E59712FE19B53A",
    },
};
export const Tomato: ITokenContract = {
    nameLong: "ERC20 Tomato",
    nameShort: "TMT",
    address: {
        hardhat: "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9",
        bsc: "0xF711c10f403e01B18f37FDFB6F8EFF0535500D53",
        goerli: "0x0A41D46f01A8A9EeBdEc130c9a926aFc4a97B6dE",
        sepolia: "0xac3849A6d4b0a97eC86998F6e0cC531D66F5Fa82",
    },
};

export const LSR: ITokenContract = {
    nameLong: "ERC20 LSR",
    nameShort: "LSR",
    address: {
        hardhat: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
        bsc: "0xC2F792FC4FE2b6D892f5fA03C8cE4E7fD3CEA0eD",
        goerli: "0xe0B81076Fa915a280f03bFb746A4F5873578E287",
        sepolia: "0xF8E133c6B4bC73d89723B138E0654AeaAD11Bd21",
    },
};
export const Factory: ITokenContract = {
    nameLong: "Pancake Factory",
    nameShort: "Pancake Factory",
    address: {
        hardhat: "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9",
        bsc: "0x313b07eE316ca75471B5E8c6Fe2871Da1eE9EE04",
        goerli: "0xB48475F43de9BF5Fcd2fce228F74F9B5F80E73F6",
        sepolia: "0xfA85901DBeB559EBA2d15bdc1c9EdfC14D880cAC",
    },
};

export const Router_mod = {
    address: {
        hardhat: "0x5fc8d32690cc91d4c39d9d3abcbd16989f875707",
        bsc: "0x62ac2A242A7E996E1329AB8320669ec9064527aA",
        goerli: "0x7d29E9366C3022F30a8fd72ef59CaC95BC9e8B72",
        sepolia: "0xf1f8c1B19e56f34220B2eef5B19a15c2DF504f5F",
    },
};
