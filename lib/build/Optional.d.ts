export declare class Optional<T> {
    private readonly value;
    static of<T>(value: T | undefined): Optional<T>;
    static empty<T>(): Optional<T>;
    private constructor();
    hasValue(): this is Optional<T>;
    flatMap<U>(projectFn: (value: T) => Optional<U>): Optional<U>;
    map<U>(projectFn: (value: T) => U): Optional<U>;
    withValue(callback: (value: T) => void): void;
    getOrThrow(): T;
    getOrElse(elseValue: T): T;
}
