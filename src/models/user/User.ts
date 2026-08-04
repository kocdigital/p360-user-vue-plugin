import type IUser from './IUser';
import type IUserProperties from './IUserProperties';

export default class User<P extends IUserProperties = IUserProperties> implements IUser<P> {
    Id: string;
    Email: string;
    UserName: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    OrganizationId: string;
    Properties: Partial<P>;

    constructor(detail: Partial<IUser<P>> = {}) {
        this.Id = detail?.Id || '';
        this.Email = detail?.Email || '';
        this.UserName = detail?.UserName || '';
        this.FirstName = detail?.FirstName || '';
        this.LastName = detail?.LastName || '';
        this.PhoneNumber = detail?.PhoneNumber || '';
        this.OrganizationId = detail?.OrganizationId || '';
        this.Properties = detail?.Properties || {};
    }

    /**
     * The user full name
     */
    get fullName(): string {
        if (this.FirstName || this.LastName) {
            if (this.FirstName && !this.LastName) {
                return `${this.FirstName} -`;
            } else if (!this.FirstName && this.LastName) {
                return `- ${this.LastName}`;
            } else {
                return `${this.FirstName} ${this.LastName}`;
            }
        } else if (this.Properties?.FirstName || this.Properties?.LastName) {
            if (this.Properties?.FirstName && !this.Properties?.LastName) {
                return `${this.Properties.FirstName} -`;
            } else if (!this.Properties?.FirstName && this.Properties?.LastName) {
                return `- ${this.Properties.LastName}`;
            } else {
                return `${this.Properties.FirstName} ${this.Properties.LastName}`;
            }
        } else {
            return this.UserName || '';
        }
    }

    toJSON(): IUser {
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

    toString(): string {
        return JSON.stringify(this.toJSON());
    }

    [Symbol.toStringTag](): string {
        return `User(Id="${this.Id}")`
    }
}
