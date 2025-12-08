import type IUserProperties from './IUserProperties';

export default interface IUser {
    Id: string;
    Email: string;
    UserName: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    OrganizationId: string;
    Properties: Partial<IUserProperties>;
}
