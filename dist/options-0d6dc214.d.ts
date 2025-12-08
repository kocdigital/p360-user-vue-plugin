import { U as User, J as JwtUser, I as IUser } from './User-7a583b28.js';

interface UserVuePluginOptions {
    storage?: Storage;
    storageKey?: string;
    CustomUser?: typeof User;
    CustomJwtUser?: typeof JwtUser;
    fetchUserById?: <U extends IUser = IUser>(id: string) => Promise<U>;
}

export { UserVuePluginOptions as U };
