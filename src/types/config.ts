import type {
    JwtUser as DefaultJwtUser,
    User as DefaultUser,
    IUser
} from '@/models/user';

export interface UserVuePluginOptions {
    storage?: Storage;
    storageKey?: string;
    CustomUser?: typeof DefaultUser;
    CustomJwtUser?: typeof DefaultJwtUser;
    fetchUserById?: <U extends IUser = IUser>(id: string) => Promise<U>;
}
