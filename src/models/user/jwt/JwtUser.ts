import type IJwtUser from './IJwtUser';

export default class JwtUser implements Omit<IJwtUser, 'organization-id' | 'user-type' | 'is-zone-user' | 'tenant-id'> {
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

    constructor(data: Partial<IJwtUser> = {}) {
        this.nbf = data?.nbf || 0;
        this.exp = data?.exp || 0;
        this.iss = data?.iss || '';
        this.aud = data?.aud || [];
        this.client_id = data?.client_id || '';
        this.sub = data?.sub || '';
        this.auth_time = data?.auth_time || 0;
        this.idp = data?.idp || '';
        this.name = data?.name || '';
        this.email = data?.email || '';
        this.organization_id = data?.['organization-id'] || '';
        this.user_type = data?.['user-type'] || '';
        this.is_zone_user = data?.['is-zone-user'] || '';
        this.tenant_id = data?.['tenant-id'] || '';
        this.sid = data?.sid || '';
        this.iat = data?.iat || 0;
        this.scope = data?.scope || [];
        this.amr = data?.amr || [];
    }
}
