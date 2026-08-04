import isEqual from 'lodash.isequal';
import {revokeSf} from '@kocdigital/sf-interface';

import config from '@/config';
import identityServerUsersApi from '@/services/identityServerUsersApi';

import type {VueConstructor, PluginObject} from 'vue';
import {
    JwtUser as DefaultJwtUser,
    User as DefaultUser,
    User,
    type IJwtUser,
    type IUser
} from '@/models/user';

import type {UserVuePluginOptions} from '@/types/options';

const sfCore = revokeSf();

export async function _defaultFetchUserById(id: string) {
    const res = await identityServerUsersApi.getUserById(id);

    return res.data?.Data;
}

export default {
    // #region Internal options
    _storage: localStorage,
    _storageKey: config.STORAGE.USER_KEY,
    // #endregion

    // #region User classes
    _User: DefaultUser,
    _JwtUser: DefaultJwtUser,
    // #endregion

    // #region Token User
    _jwtUser: null as InstanceType<typeof DefaultJwtUser> | null,
    _tokenUser: null as InstanceType<typeof DefaultUser> | null,
    // #endregion

    _persistedUser: null as InstanceType<typeof DefaultUser> | null,

    createUser(data: Partial<IUser>): InstanceType<typeof this._User> {
        return new this._User(data);
    },

    createJwtUser(data: Partial<IJwtUser>): InstanceType<typeof this._JwtUser> {
        return new this._JwtUser(data);
    },

    /**
     * Vue plugin entry point
     */
    install(Vue, options = {}): void {
        // #region Storage options
        this._storage = options?.storage ?? localStorage;
        this._storageKey = options?.storageKey ?? config.STORAGE.USER_KEY;
        // #endregion

        // #region User options
        this._User = options?.CustomUser ?? DefaultUser;
        this._JwtUser = options?.CustomJwtUser ?? DefaultJwtUser;
        const fetchUserById = options.fetchUserById ?? _defaultFetchUserById;
        // #endregion

        this._jwtUser = Object.freeze(this.createJwtUser(sfCore.services.checkUser()));
        if (this._jwtUser) {
            this._tokenUser = Object.freeze(this.createUser({
                Id: this._jwtUser.sub,
                UserName: this._jwtUser.name,
                Email: this._jwtUser.email,
                OrganizationId: this._jwtUser.organization_id
            }));
        }

        const { promise: _userLoaded, resolve: _userLoadedResolve } = Promise.withResolvers<boolean>();

        const _onStorage = (event: StorageEvent): void => {
            if (event.key === config.STORAGE.USER_KEY) {
                try {
                    if (event.oldValue !== null && event.newValue === null) {
                        // User data was removed from storage
                        Vue.prototype.$_persistedUser = null;
                    } else if (event.newValue !== null && event.newValue !== 'undefined') {
                        Vue.prototype.$_persistedUser = this.createUser(JSON.parse(event.newValue));
                    }
                } catch (error) {
                    Vue.prototype.$_persistedUser = null;

                    _userLoadedResolve(false);
                }
            }
        }

        const _fetchUser = async () => {
            try {
                const userId = Vue.prototype.$jwtUser.sub;
                const user = await fetchUserById(userId);

                if (user) {
                    Vue.prototype.$_persistedUser = this.createUser(user);

                    _userLoadedResolve(true);
                } else {
                    _userLoadedResolve(false);
                }
            } catch (error) {
                Vue.prototype.$_persistedUser = null;

                _userLoadedResolve(false);
            }
        }

        const unsubscribeAction = sfCore.services.store.subscribeAction((action: any) => {
            if (action.type === 'signOut') {
                Vue.prototype.$_persistedUser = null;

                unsubscribeAction();
            }
        });

        window.addEventListener('storage', _onStorage);

        const storedUser = this._storage.getItem(this._storageKey);

        if (storedUser !== null) {
            try {
                if (storedUser !== 'undefined' && storedUser !== 'null') {
                    this._persistedUser = this.createUser(JSON.parse(storedUser));

                    _userLoadedResolve(true);
                } else {
                    this._persistedUser = null;
                }
            } catch (error) {
                this._persistedUser = null;
            }
        } else {
            this._persistedUser = null;
        }

        if (!Object.hasOwn(Vue.prototype, '$_persistedUser')) {
            Object.defineProperty(Vue.prototype, '$_persistedUser', {
                get() {
                    return this._persistedUser;
                },
                set(value) {
                    if (value instanceof User) {
                        if (isEqual(value, this._persistedUser)) {
                            return;
                        }

                        this._persistedUser = value;

                        this._storage.setItem(this._storageKey, this._persistedUser.toString());
                    } else {
                        this._persistedUser = null;

                        this._storage.removeItem(this._storageKey);
                    }
                },
                configurable: true,
                enumerable: true
            });
        }

        if (!Object.hasOwn(Vue.prototype, '$jwtUser')) {
            Object.defineProperty(Vue.prototype, '$jwtUser', {
                get() {
                    return this._jwtUser;
                },
                set(v) {
                    console.error('Cannot set read-only property `$jwtUser`');
                },
                enumerable: true,
                configurable: true
            });
        }

        if (!Object.hasOwn(Vue.prototype, '$user')) {
            Object.defineProperty(Vue.prototype, '$user', {
                get() {
                    return this._persistedUser || this._tokenUser;
                },
                set(v) {
                    console.error('Cannot set read-only property `$user`');
                },
                enumerable: true,
                configurable: true
            });
        }

        if (!Object.hasOwn(Vue.prototype, '$userLoaded')) {
            Object.defineProperty(Vue.prototype, '$userLoaded', {
                get() {
                    return _userLoaded;
                },
                set(v) {
                    console.error('Cannot set read-only property `$userLoaded`');
                },
                enumerable: true,
                configurable: true
            });
        }

        if (!this._persistedUser || (this._jwtUser?.sub !== this._persistedUser?.Id)) {
            _fetchUser();
        }
    }
} as PluginObject<UserVuePluginOptions>;
