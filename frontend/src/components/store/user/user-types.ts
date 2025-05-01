export interface IUserState {
  user: IUser | null;
  status: string;
  error: null | string;
}

// export interface IResponse {
//   message: string;
//   user: IUser;
// }

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface IEmail {
  email: string;
}
export interface IEmailOrderConfirm {
  name: string;
  email: string;
}
export interface ILogin {
  message: string;
  user: IUser;
}
export interface IRegister {
  message: string;
  user: IUser;
}
