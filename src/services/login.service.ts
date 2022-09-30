import axios from "axios";
import { BASE_URL } from "./../constants/network.constants";
import { ErrorResponseInterface } from "src/interfaces/error.interface";
import {
  UserLoginInterface,
  UserResponseInterface,
} from "src/interfaces/user.interface";

export const loginService = async (
  email: string,
  password: string
): Promise<UserResponseInterface | ErrorResponseInterface> => {
  try {
    const url = `${BASE_URL}/auth/login`;
    const params: UserLoginInterface = { email, password };
    const response = await axios.post(url, params);
    const data = response.data as UserResponseInterface;
    return data;
  } catch (err: any) {
    return { ok: err.response.data.ok, msg: err?.response.data.msg };
  }
};
