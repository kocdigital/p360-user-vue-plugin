export interface APIBaseResponse<T = any> {
    Data: T;
    StatusCode: 'OK';
    Identifier: string;
    IsSuccess: true;
}
