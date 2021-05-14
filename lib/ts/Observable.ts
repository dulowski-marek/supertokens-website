import { Observer } from './Observer';

export interface Observable<T> {
    subscribe(observer: Observer<T>): () => void;
}
