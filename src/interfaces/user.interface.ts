export interface UserInterFace {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserLoginInterface {
  email: string;
  password: string;
}

export interface UserDBInterface {
  uid: string;
  username: string;
  email: string;
  image: string;
  token: string;
}

export interface UserResponseInterface {
  ok: boolean;
  uid: string;
  username: string;
  email: string;
  image: string;
  token: string;
}

export interface AllUsersInterface {
  ok: boolean;
  token: string;
  users: UserDBInterface[];
}

export interface UserSocketInterface {
  socketId: string;
  userId: string;
}

export interface UserSelectedInterface {
  user: UserDBInterface | undefined;
  logged: boolean;
}
