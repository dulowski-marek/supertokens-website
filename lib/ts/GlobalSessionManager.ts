import { SessionManager } from './SessionManager';
import { Session } from './Session';
import { Subject } from './Subject';
import { Observer } from './Observer';
import { TokenInfo } from './TokenInfo';
import { Optional } from './Optional';

/**
 * GlobalSessionManager is meant to act as a central Session hub. It's an **internal** API.
 * Whenever system-wide TokenInfo changes, which is signified by calling next(),
 * it maps it to a Session and notifies its observers.
 *
 * Many session managers like this may exist, but this one is global
 * to provide a one, opinionated entry point to the mechanism and one sink for TokenInfo sources.
 *
 * You can subscribe to many TokenInfo sources, possibly listening even to TokenInfo changes
 * in another tab.
 *
 * @usage:
 * ```ts
 *  const tokenInfoSource: Observable<Optional<TokenInfo>>;
 *
 *  tokenInfoSource.subscribe(GlobalSessionManager);
 * ```
 */
class GlobalSessionManager implements SessionManager {
    private session$ = new Subject<Optional<Session>>();

    next(frontToken: Optional<TokenInfo>): void {
        this.session$.next(frontToken.map(token => new Session(token)));
    }

    subscribe(observer: Observer<Optional<Session>>): () => void {
        return this.session$.subscribe(observer);
    }
}

export default new GlobalSessionManager();
