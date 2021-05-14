import { TokenInfo } from './TokenInfo';
export declare class Session<T = any> {
    private readonly tokenInfo;
    constructor(tokenInfo: TokenInfo);
    getUserId(): string;
    getPayload(): T;
}
