import { TokenInfo } from './TokenInfo';

export class Session<T = any> {
    constructor(
        private readonly tokenInfo: TokenInfo,
    ) { }

    getUserId(): string {
        return this.tokenInfo.uid;
    }

    getPayload(): T {
        return this.tokenInfo.up;
    }
}
