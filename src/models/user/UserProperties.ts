export default class UserProperties<T extends Record<string, string>> {
    protected _properties: Map<keyof T, string>;

    constructor(properties: Partial<T> = {}) {
        const iterableProperties = Object.entries(properties);

        this._properties = new Map<keyof T, string>(iterableProperties as Iterable<[keyof T, string]>);
    }

    get size(): number {
        return this._properties.size;
    }

    has(key: keyof T): boolean {
        return this._properties.has(key);
    }

    get(key: keyof T): string | undefined {
        return this._properties.get(key);
    }

    set(key: keyof T, value: string): void {
        this._properties.set(key, value);
    }

    delete(key: keyof T): boolean {
        return this._properties.delete(key);
    }

    clear(): void {
        this._properties.clear();
    }

    forEach(callbackfn: (value: string, key: keyof T, map: Map<keyof T, string>) => void, thisArg?: any): void {
        this._properties.forEach(callbackfn, thisArg);
    }

    toJSON(): Record<keyof T, string> {
        return Object.fromEntries(this._properties) as Record<keyof T, string>;
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }

    [Symbol.toStringTag](): string {
        return `UserProperties(${this.toString()})`;
    }
}
