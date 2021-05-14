import { Observable } from './Observable';
import { Observer } from './Observer';
export declare class Subject<T> implements Observable<T>, Observer<T> {
    private observers;
    next(item: T): void;
    subscribe(observer: Observer<T>): () => void;
}
