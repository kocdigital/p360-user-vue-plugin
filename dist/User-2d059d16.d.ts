interface IJwtUser {
    /**
     * Not before time
     * @example 1761036042
     */
    nbf: number;
    /**
     * Expiration time
     * @example 1763628042
     */
    exp: number;
    /**
     * Issuer
     */
    iss: string;
    /**
     * Audiences
     */
    aud: Array<string>;
    client_id: string;
    /**
     * User Id
     */
    sub: string;
    /**
     * Authentication time
     */
    auth_time: number;
    /**
     * Identity provider
     */
    idp: string;
    /**
     * User's full name
     */
    name: string;
    email: string;
    'organization-id': string;
    'user-type': string;
    'is-zone-user': 'true' | 'false';
    'tenant-id': string;
    /**
     * Session Id
     */
    sid: string;
    /**
     * Issued at time
     * @example 1761036042
     */
    iat: number;
    /**
     * User's authorized scopes
     */
    scope: Array<string>;
    /**
     * Authentication Methods References
     */
    amr: Array<string>;
}

declare class JwtUser implements Omit<IJwtUser, 'organization-id' | 'user-type' | 'is-zone-user' | 'tenant-id'> {
    nbf: number;
    exp: number;
    iss: string;
    aud: Array<string>;
    client_id: string;
    sub: string;
    auth_time: number;
    idp: string;
    name: string;
    email: string;
    organization_id: string;
    user_type: string;
    /**
     * @example "true" | "false"
     */
    is_zone_user: string;
    tenant_id: string;
    sid: string;
    iat: number;
    scope: Array<string>;
    amr: Array<string>;
    constructor(data?: Partial<IJwtUser>);
}

interface IUserProperties extends Record<string, string | undefined> {
}

interface IUser<P extends IUserProperties = IUserProperties> {
    Id: string;
    Email: string;
    UserName: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    OrganizationId: string;
    Properties: Partial<P>;
}

declare class User<P extends IUserProperties = IUserProperties> implements IUser<P> {
    Id: string;
    Email: string;
    UserName: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    OrganizationId: string;
    Properties: Partial<P>;
    constructor(detail?: Partial<IUser<P>>);
    /**
     * The user full name
     */
    get fullName(): string;
    toJSON(): IUser;
    toString(): string;
    [Symbol.toStringTag](): string;
}

export { IUser as I, JwtUser as J, User as U, IUserProperties as a, IJwtUser as b };
