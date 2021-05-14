import { Session } from './Session';
import { Observable } from './Observable';
import { Observer } from './Observer';
import { TokenInfo } from './TokenInfo';
import { Optional } from './Optional';
export interface SessionManager extends Observable<Optional<Session>>, Observer<Optional<TokenInfo>> {
}
