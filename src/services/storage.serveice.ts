import DefaultImage from "src/assets/default.png";
import { UserDBInterface } from "src/interfaces/user.interface";

export const saveUser = (
  uid: string,
  username: string,
  email: string,
  image: string,
  token: string
): void => {
  const userInfo = {
    uid,
    username,
    email,
    image: image || DefaultImage,
  };
  localStorage.setItem("token", token);
  localStorage.setItem("chat-user", JSON.stringify(userInfo));
};

export const updateToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const getUser = (): UserDBInterface => {
  const user = JSON.parse(localStorage.getItem("chat-user")!);
  return user;
};

export const getToken = (): string | null => {
  const token: string | null = localStorage.getItem("token");
  return token;
};

export const clearUser = (): void => {
  localStorage.clear();
};
