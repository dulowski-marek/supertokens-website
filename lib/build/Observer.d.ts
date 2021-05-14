export interface Observer<T> {
    next(item: T): void;
}
