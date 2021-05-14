export class Optional<T> {
    public static of<T>(value: T | undefined): Optional<T> {
        if (value === undefined) {
            return Optional.empty<T>();
        }

        return new Optional(value);
    }

    public static empty<T>() {
        return new Optional<T>(null as unknown as T);
    }

    private constructor(
        private readonly value: T,
    ) { }

    public hasValue(): this is Optional<T> {
        return this.value !== null;
    }

    public flatMap<U>(projectFn: (value: T) => Optional<U>): Optional<U> {
        return this.hasValue()
            ? projectFn(this.value)
            : Optional.empty<U>();
    }

    public map<U>(projectFn: (value: T) => U): Optional<U> {
        return this.flatMap(value => Optional.of(projectFn(value)));
    }

    public withValue(callback: (value: T) => void): void {
        if (this.hasValue()) {
            callback(this.value);
        }
    }

    public getOrThrow(): T {
        if (!this.hasValue()) {
            throw new Error(`Missing Optional value!`);
        }

        return this.value;
    }

    public getOrElse(elseValue: T): T {
        return this.hasValue()
            ? this.value
            : elseValue;
    }
}