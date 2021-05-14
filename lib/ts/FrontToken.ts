// Note: We do not store this in memory because another tab may have
// modified this value, and if so, we may not know about it in this tab
import { getFrontToken, setFrontToken } from './fetch';
import { TokenInfo } from './TokenInfo';
import { Subject } from './Subject';
import { Observer } from './Observer';
import { Optional } from './Optional';

export abstract class FrontToken {
    private static frontToken$ = new Subject<Optional<TokenInfo>>();

    static async getTokenInfo(): Promise<TokenInfo | undefined> {
        let frontToken = await getFrontToken();
        if (frontToken === null) {
            return undefined;
        }
        return JSON.parse(atob(frontToken));
    }

    static async removeToken() {
        await setFrontToken(undefined);
    }

    static async setItem(frontToken: string) {
        await setFrontToken(frontToken);

        this.frontToken$.next(Optional.of(await FrontToken.getTokenInfo()));
    }

    static subscribe(observer: Observer<Optional<TokenInfo>>): () => void {
        return this.frontToken$.subscribe(observer);
    }
}