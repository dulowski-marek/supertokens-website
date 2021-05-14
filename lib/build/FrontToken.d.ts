import { TokenInfo } from './TokenInfo';
import { Observer } from './Observer';
import { Optional } from './Optional';
export declare abstract class FrontToken {
    private static frontToken$;
    static getTokenInfo(): Promise<TokenInfo | undefined>;
    static removeToken(): Promise<void>;
    static setItem(frontToken: string): Promise<void>;
    static subscribe(observer: Observer<Optional<TokenInfo>>): () => void;
}
