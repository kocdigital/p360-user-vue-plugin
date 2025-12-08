export default interface IJwtUser {
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
