import { Box, Typography } from "@mui/material";
import portrait from "../../assets/images/Egor-budda.jpeg";

export const InfoContent = (): JSX.Element => {
    return (
        <Box>
            <p>
                Veggie dex is a Web3 app - <b>Uniswap v2 </b>fork decentralized
                exchange with 4 listed ERC-20 tokens: Apple (APL), Potato (PTT),
                Tomato(TMT) and LSR. Supported networks are:{" "}
                <b>Sepolia, BSC Testnet and Hardhat Local</b>.
            </p>
            <p>
                Pleace, connect your wallet to the DEX and select the network to
                get access to User features and DEX functionality.
            </p>
            <p>
                To start interacting with DEX for the first time user can mint
                some listed tokens in the <b>"Mint tokens"</b> section. The
                balance of listed tokens is shown in the <b>"User assets"</b>{" "}
                section. Users can mint only a limited amount of tokens in an
                assigned period. These limitations could be changed by the smart
                contract Owner.
            </p>
            <p>
                PancakeRouter_mod smart contract can have an Admin, who can set
                the transfer fee, withdraw the transfer fee set the required LSR
                amount to avoid paying a trading fee. Admin role could be
                assigned or revoked by the Owner.
            </p>
            <p>∑∑∑∑
                You can become a liquidity provider by adding liquidity to a
                corresponding pair in the &nbsp; <b>"Add liquidity"</b> section.
                Swap tokens feature is available in the <b>"Swap"</b> section
            </p>
            <p>
                All available liquidity pools with corresponding reserves are
                shown in the <b>"Liquidity pools"</b> section
            </p>
            <p>
                Smart contracts of this DEX could be found in the corresponding
                &nbsp;
                <a
                    href="https://github.com/Khazaar/pancake-router"
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub repository
                </a>
                &nbsp; with the Hardhat project. You can use this project to
                connect this Web3 app to the <b>Hardhat Local</b> network.
            </p>
        </Box>
    );
};
export const ContactContent = (): JSX.Element => {
    return (
        <Box
            sx={{
                display: "flex",
                marginRight: "6px",
                flexDirection: {
                    xs: "column",
                    sm: "column",
                    md: "row",
                    lg: "row",
                },
                alignItems: "center",
            }}
        >
            <Box sx={{ marginRight: "12px" }}>
                <img src={portrait} alt="" width="300rem" />
            </Box>
            <Box>
                <p>
                    <b>Yoav Khazar</b>
                </p>
                <p>Full-stack web3 developer, Ph.D.</p>
                <p>Solidity, Hadrhat, Brownie, Angular</p>

                <p>
                    e-mail:
                    <a
                        href="mailto: eeguar@gmail.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        eeguar@gmail.com
                    </a>
                </p>
                <p>
                    Telegram &nbsp;
                    <a
                        href="https://telegram.me/khazaaaar"
                        target="_blank"
                        rel="noreferrer"
                    >
                        @khazaaaar
                    </a>
                </p>
                <p>
                    Tel:
                    <a href="+972533210038" target="_blank">
                        +972533210038
                    </a>
                </p>
                <p>
                    Linked-in:
                    <a
                        href="https://www.linkedin.com/in/yoav-khazar-6361169b/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Yoav Khazar
                    </a>
                </p>
            </Box>
        </Box>
    );
};

export const CodeContent = (): JSX.Element => {
    return (
        <Box>
            <p>
                <b>Veggie dex</b> application is developed with React library
                using such web3 modules as ethers-v5, typechain and wagmi
            </p>
            <p>
                Smart contracts, with wich DEX interacts, are deployed anv
                verified on the networks <b>BSC testnet</b> and <b>Sepolia</b>{" "}
                Corresponding addresses are:
            </p>
            <p>
                <b>ERC20 Apple</b>
                <br></br>
                hardhat: "0x5fbdb2315678afecb367f032d93f642f64180aa3"
                <br></br>BSC testnet:
                "0xEE62EFE7E75FE11e508F8FeA1A9cC71fF3E5990a"
                <br></br>Sepolia: "0xF3B0Bf3cdC24ae7d9FC7Df08B98E2a3d30071b8f"
                <br></br>
                <br></br>
                <b>ERC20 Potato</b>
                <br></br>
                hardhat: "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0"
                <br></br>BSC testnet:
                "0xBbDf268b28386a5D178571788d8fa669DB2f69bC"
                <br></br>Sepolia: "0x4075B23f1D93e99439eC078BB3E59712FE19B53A"
                <br></br>
                <br></br>
                <b>ERC20 Tomato</b>
                <br></br>
                hardhat: "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9"
                <br></br>BSC testnet:
                "0xF711c10f403e01B18f37FDFB6F8EFF0535500D53"
                <br></br>Sepolia: "0xac3849A6d4b0a97eC86998F6e0cC531D66F5Fa82"
                <br></br>
                <br></br>
                <b>ERC20 LSR</b>
                <br></br>
                hardhat: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"
                <br></br>BSC testnet:
                "0xC2F792FC4FE2b6D892f5fA03C8cE4E7fD3CEA0eD"
                <br></br>Sepolia: "0xF8E133c6B4bC73d89723B138E0654AeaAD11Bd21"
                <br></br>
                <br></br>
                <b>Pancake Factory</b>
                <br></br>
                hardhat: "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9"
                <br></br>BSC testnet:
                "0x313b07eE316ca75471B5E8c6Fe2871Da1eE9EE04"
                <br></br>Sepolia: "0xfA85901DBeB559EBA2d15bdc1c9EdfC14D880cAC"
                <br></br>
                <br></br>
                <b>Router_mod</b>
                <br></br>
                hardhat: "0x5fc8d32690cc91d4c39d9d3abcbd16989f875707"
                <br></br>BSC testnet:
                "0x62ac2A242A7E996E1329AB8320669ec9064527aA"
                <br></br>Sepolia: "0xf1f8c1B19e56f34220B2eef5B19a15c2DF504f5F"
            </p>
        </Box>
    );
};
