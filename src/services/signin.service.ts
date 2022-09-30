import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "src/constants/network.constants";
import { ErrorResponseInterface } from "src/interfaces/error.interface";
import {
  UserInterFace,
  UserResponseInterface,
} from "src/interfaces/user.interface";

export const signService = async ({
  username,
  email,
  password,
  confirmPassword,
}: UserInterFace): Promise<UserResponseInterface | ErrorResponseInterface> => {
  try {
    const url = `${BASE_URL}/auth/sigin`;
    const data: UserInterFace = { username, email, password, confirmPassword };
    const response: AxiosResponse<any, any> = await axios.post(url, data);
    return response.data;
  } catch (err: any) {
    return { ok: err.response.data.ok, msg: err?.response.data.msg };
  }
};
