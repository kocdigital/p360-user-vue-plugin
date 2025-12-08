export { a as IJwtUser, I as IUser, b as IUserProperties, J as JwtUser, U as User } from './User-7a583b28.js';

declare class UserProperties<T extends Record<string, string>> {
    protected _properties: Map<keyof T, string>;
    constructor(properties?: Partial<T>);
    get size(): number;
    has(key: keyof T): boolean;
    get(key: keyof T): string | undefined;
    set(key: keyof T, value: string): void;
    delete(key: keyof T): boolean;
    clear(): void;
    forEach(callbackfn: (value: string, key: keyof T, map: Map<keyof T, string>) => void, thisArg?: any): void;
    toJSON(): Record<keyof T, string>;
    toString(): string;
    [Symbol.toStringTag](): string;
}

export { UserProperties };
