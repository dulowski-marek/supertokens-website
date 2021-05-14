import { SessionManager } from './SessionManager';
import { Session } from './Session';
import { Observer } from './Observer';
import { TokenInfo } from './TokenInfo';
import { Optional } from './Optional';
declare class GlobalSessionManager implements SessionManager {
    private session$;
    next(frontToken: Optional<TokenInfo>): void;
    subscribe(observer: Observer<Optional<Session>>): () => void;
}
declare const _default: GlobalSessionManager;
export default _default;
