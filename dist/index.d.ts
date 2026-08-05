import { U as User, J as JwtUser, I as IUser, a as IUserProperties } from './User-2d059d16.js';
import { PluginObject } from 'vue';

interface UserVuePluginOptions {
    storage?: Storage;
    storageKey?: string;
    CustomUser?: typeof User;
    CustomJwtUser?: typeof JwtUser;
    fetchUserById?: <U extends IUser = IUser>(id: string) => Promise<U>;
}

declare module 'vue/types/vue' {
    interface Vue {
        $jwtUser: Readonly<InstanceType<typeof JwtUser>>;
        $user: Readonly<InstanceType<typeof User>>;
        $userLoaded: Promise<boolean>;
    }
}

declare function _defaultFetchUserById(id: string): Promise<IUser<IUserProperties>>;
declare const _default: PluginObject<UserVuePluginOptions>;

export { UserVuePluginOptions, _defaultFetchUserById, _default as default };
