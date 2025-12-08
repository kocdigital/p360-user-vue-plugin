import {
  JwtUser,
  User,
  __async
} from "./chunk-D3LPWCJV.js";

// src/index.ts
import isEqual from "lodash.isequal";
import { revokeSf as revokeSf2 } from "@kocdigital/sf-interface";

// src/config.ts
var config_default = {
  STORAGE: {
    USER_KEY: "x-user"
  },
  CONFIG_KEY: {
    CORE_GATEWAY: "CORE_GATEWAY"
  }
};

// src/services/identityServerUsersApi.ts
import { revokeSf } from "@kocdigital/sf-interface";
var sfCore = revokeSf();
var instance = sfCore.services.createSecureInstance("", {
  disableErrorNotifications: true,
  loader: true
});
var resource = "/identityserverusers-api/api/v1";
var identityServerUsersApi_default = {
  getUserById(userId) {
    return __async(this, null, function* () {
      instance.defaults.baseURL = yield sfCore.services.asyncConfig.get(config_default.CONFIG_KEY.CORE_GATEWAY);
      return yield instance.get(`${resource}/users/${userId}`);
    });
  }
};

// src/index.ts
var sfCore2 = revokeSf2();
function _defaultFetchUserById(id) {
  return __async(this, null, function* () {
    var _a;
    const res = yield identityServerUsersApi_default.getUserById(id);
    return (_a = res.data) == null ? void 0 : _a.Data;
  });
}
var src_default = {
  // #region Internal options
  _storage: localStorage,
  _storageKey: config_default.STORAGE.USER_KEY,
  // #endregion
  // #region User classes
  _User: User,
  _JwtUser: JwtUser,
  // #endregion
  // #region Token User
  _jwtUser: null,
  _tokenUser: null,
  // #endregion
  _persistedUser: null,
  createUser(data) {
    return new this._User(data);
  },
  createJwtUser(data) {
    return new this._JwtUser(data);
  },
  /**
   * Vue plugin entry point
   */
  install(Vue, options = {}) {
    var _a, _b, _c, _d, _e, _f, _g;
    this._storage = (_a = options == null ? void 0 : options.storage) != null ? _a : localStorage;
    this._storageKey = (_b = options == null ? void 0 : options.storageKey) != null ? _b : config_default.STORAGE.USER_KEY;
    this._User = (_c = options == null ? void 0 : options.CustomUser) != null ? _c : User;
    this._JwtUser = (_d = options == null ? void 0 : options.CustomJwtUser) != null ? _d : JwtUser;
    const fetchUserById = (_e = options.fetchUserById) != null ? _e : _defaultFetchUserById;
    this._jwtUser = Object.freeze(this.createJwtUser(sfCore2.services.checkUser()));
    if (this._jwtUser) {
      this._tokenUser = Object.freeze(this.createUser({
        Id: this._jwtUser.sub,
        UserName: this._jwtUser.name,
        Email: this._jwtUser.email,
        OrganizationId: this._jwtUser.organization_id
      }));
    }
    const { promise: _userLoaded, resolve: _userLoadedResolve } = Promise.withResolvers();
    const _onStorage = (event) => {
      if (event.key === config_default.STORAGE.USER_KEY) {
        try {
          if (event.oldValue !== null && event.newValue === null) {
            Vue.prototype.$_persistedUser = null;
          } else if (event.newValue !== null && event.newValue !== "undefined") {
            Vue.prototype.$_persistedUser = this.createUser(JSON.parse(event.newValue));
          }
        } catch (error) {
          Vue.prototype.$_persistedUser = null;
          _userLoadedResolve(false);
        }
      }
    };
    const _fetchUser = () => __async(this, null, function* () {
      try {
        const userId = Vue.prototype.$jwtUser.sub;
        const user = yield fetchUserById(userId);
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
    });
    const unsubscribeAction = sfCore2.services.store.subscribeAction((action) => {
      if (action.type === "signOut") {
        Vue.prototype.$_persistedUser = null;
        unsubscribeAction();
      }
    });
    window.addEventListener("storage", _onStorage);
    const storedUser = this._storage.getItem(this._storageKey);
    if (storedUser !== null) {
      try {
        if (storedUser !== "undefined" && storedUser !== "null") {
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
    if (!Object.hasOwn(Vue.prototype, "$_persistedUser")) {
      Object.defineProperty(Vue.prototype, "$_persistedUser", {
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
    if (!Object.hasOwn(Vue.prototype, "$jwtUser")) {
      Object.defineProperty(Vue.prototype, "$jwtUser", {
        get() {
          return this._jwtUser;
        },
        set(v) {
          console.error("Cannot set read-only property `$jwtUser`");
        },
        enumerable: true,
        configurable: true
      });
    }
    if (!Object.hasOwn(Vue.prototype, "$user")) {
      Object.defineProperty(Vue.prototype, "$user", {
        get() {
          return this._persistedUser || this._tokenUser;
        },
        set(v) {
          console.error("Cannot set read-only property `$user`");
        },
        enumerable: true,
        configurable: true
      });
    }
    if (!Object.hasOwn(Vue.prototype, "$userLoaded")) {
      Object.defineProperty(Vue.prototype, "$userLoaded", {
        get() {
          return _userLoaded;
        },
        set(v) {
          console.error("Cannot set read-only property `$userLoaded`");
        },
        enumerable: true,
        configurable: true
      });
    }
    if (!this._persistedUser || ((_f = this._jwtUser) == null ? void 0 : _f.sub) !== ((_g = this._persistedUser) == null ? void 0 : _g.Id)) {
      _fetchUser();
    }
  }
};
export {
  _defaultFetchUserById,
  src_default as default
};
