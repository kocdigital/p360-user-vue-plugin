import type IUserProperties from './IUserProperties';

export default interface IUser<P extends IUserProperties = IUserProperties> {
    Id: string;
    Email: string;
    UserName: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    OrganizationId: string;
    Properties: Partial<P>;
}
