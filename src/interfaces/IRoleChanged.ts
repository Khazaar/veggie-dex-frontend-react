import { BytesLike } from "ethers";

export interface IRoleChanged {
    role: BytesLike;
    account: string;
    sender: string | null;
}
