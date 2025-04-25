export interface IUserState {
  user: IUser | null;
  email: string;
  status: string;
  error: null | string;
}

export interface IUser {
  id: number;
  name: number;
  email: number;
  password: number;
}

export interface IEmail {
  email: string;
}
