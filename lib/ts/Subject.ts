import { Observable } from './Observable';
import { Observer } from './Observer';

export class Subject<T> implements Observable<T>, Observer<T> {
    private observers = new Set<Observer<T>>();

    next(item: T): void {
        this.observers.forEach(observer => observer.next(item));
    }

    subscribe(observer: Observer<T>): () => void {
        this.observers.add(observer);

        return () => {
            this.observers.delete(observer);
        }
    }
}