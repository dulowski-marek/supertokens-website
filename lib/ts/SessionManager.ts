import { Session } from './Session';
import { Observable } from './Observable';
import { Observer } from './Observer';
import { TokenInfo } from './TokenInfo';
import { Optional } from './Optional';

// Session manager is anything that consumes maybe(token info) info and maps it to maybe(session)
export interface SessionManager extends Observable<Optional<Session>>, Observer<Optional<TokenInfo>> { }
