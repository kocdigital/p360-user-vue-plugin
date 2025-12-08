import { VueConstructor } from 'vue';
import { I as IUser, U as User, J as JwtUser, a as IJwtUser } from './User-7a583b28.js';
import { U as UserVuePluginOptions } from './options-0d6dc214.js';

declare function _defaultFetchUserById(id: string): Promise<IUser>;
declare const _default: {
    _storage: Storage;
    _storageKey: string;
    _User: typeof User;
    _JwtUser: typeof JwtUser;
    _jwtUser: JwtUser | null;
    _tokenUser: User | null;
    _persistedUser: User | null;
    createUser(data: Partial<IUser>): InstanceType<typeof this$1._User>;
    createJwtUser(data: Partial<IJwtUser>): InstanceType<typeof this$1._JwtUser>;
    /**
     * Vue plugin entry point
     */
    install(Vue: VueConstructor, options?: UserVuePluginOptions): void;
};

export { _defaultFetchUserById, _default as default };
