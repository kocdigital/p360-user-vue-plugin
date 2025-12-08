var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/models/user/jwt/JwtUser.ts
var JwtUser = class {
  constructor(data = {}) {
    this.nbf = (data == null ? void 0 : data.nbf) || 0;
    this.exp = (data == null ? void 0 : data.exp) || 0;
    this.iss = (data == null ? void 0 : data.iss) || "";
    this.aud = (data == null ? void 0 : data.aud) || [];
    this.client_id = (data == null ? void 0 : data.client_id) || "";
    this.sub = (data == null ? void 0 : data.sub) || "";
    this.auth_time = (data == null ? void 0 : data.auth_time) || 0;
    this.idp = (data == null ? void 0 : data.idp) || "";
    this.name = (data == null ? void 0 : data.name) || "";
    this.email = (data == null ? void 0 : data.email) || "";
    this.organization_id = (data == null ? void 0 : data["organization-id"]) || "";
    this.user_type = (data == null ? void 0 : data["user-type"]) || "";
    this.is_zone_user = (data == null ? void 0 : data["is-zone-user"]) || "";
    this.tenant_id = (data == null ? void 0 : data["tenant-id"]) || "";
    this.sid = (data == null ? void 0 : data.sid) || "";
    this.iat = (data == null ? void 0 : data.iat) || 0;
    this.scope = (data == null ? void 0 : data.scope) || [];
    this.amr = (data == null ? void 0 : data.amr) || [];
  }
};

// src/models/user/User.ts
var User = class {
  constructor(detail = {}) {
    this.Id = (detail == null ? void 0 : detail.Id) || "";
    this.Email = (detail == null ? void 0 : detail.Email) || "";
    this.UserName = (detail == null ? void 0 : detail.UserName) || "";
    this.FirstName = (detail == null ? void 0 : detail.FirstName) || "";
    this.LastName = (detail == null ? void 0 : detail.LastName) || "";
    this.PhoneNumber = (detail == null ? void 0 : detail.PhoneNumber) || "";
    this.OrganizationId = (detail == null ? void 0 : detail.OrganizationId) || "";
    this.Properties = (detail == null ? void 0 : detail.Properties) || {};
  }
  /**
   * The user full name
   */
  get fullName() {
    var _a, _b, _c, _d, _e, _f;
    if (this.FirstName || this.LastName) {
      if (this.FirstName && !this.LastName) {
        return `${this.FirstName} -`;
      } else if (!this.FirstName && this.LastName) {
        return `- ${this.LastName}`;
      } else {
        return `${this.FirstName} ${this.LastName}`;
      }
    } else if (((_a = this.Properties) == null ? void 0 : _a.FirstName) || ((_b = this.Properties) == null ? void 0 : _b.LastName)) {
      if (((_c = this.Properties) == null ? void 0 : _c.FirstName) && !((_d = this.Properties) == null ? void 0 : _d.LastName)) {
        return `${this.Properties.FirstName} -`;
      } else if (!((_e = this.Properties) == null ? void 0 : _e.FirstName) && ((_f = this.Properties) == null ? void 0 : _f.LastName)) {
        return `- ${this.Properties.LastName}`;
      } else {
        return `${this.Properties.FirstName} ${this.Properties.LastName}`;
      }
    } else {
      return this.UserName || "";
    }
  }
  toJSON() {
    return {
      Id: this.Id,
      Email: this.Email,
      UserName: this.UserName,
      FirstName: this.FirstName,
      LastName: this.LastName,
      PhoneNumber: this.PhoneNumber,
      OrganizationId: this.OrganizationId,
      Properties: this.Properties
    };
  }
  toString() {
    return JSON.stringify(this.toJSON());
  }
  [Symbol.toStringTag]() {
    return `User(Id="${this.Id}")`;
  }
};

// src/models/user/UserProperties.ts
var UserProperties = class {
  constructor(properties = {}) {
    const iterableProperties = Object.entries(properties);
    this._properties = new Map(iterableProperties);
  }
  get size() {
    return this._properties.size;
  }
  has(key) {
    return this._properties.has(key);
  }
  get(key) {
    return this._properties.get(key);
  }
  set(key, value) {
    this._properties.set(key, value);
  }
  delete(key) {
    return this._properties.delete(key);
  }
  clear() {
    this._properties.clear();
  }
  forEach(callbackfn, thisArg) {
    this._properties.forEach(callbackfn, thisArg);
  }
  toJSON() {
    return Object.fromEntries(this._properties);
  }
  toString() {
    return JSON.stringify(this.toJSON());
  }
  [Symbol.toStringTag]() {
    return `UserProperties(${this.toString()})`;
  }
};

export {
  __async,
  JwtUser,
  User,
  UserProperties
};
