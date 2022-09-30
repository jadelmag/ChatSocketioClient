import axios from "axios";
import { BASE_URL } from "src/constants/network.constants";
import { ErrorResponseInterface } from "src/interfaces/error.interface";
import {
  AllUsersInterface,
  UserDBInterface,
} from "src/interfaces/user.interface";
import { getUser, getToken } from "src/services/storage.serveice";

export const getAllUsersService = async (): Promise<
  AllUsersInterface | ErrorResponseInterface
> => {
  try {
    const user: UserDBInterface = getUser();
    const token: string = getToken()!;
    const url = `${BASE_URL}/auth/all`;
    const info = { uid: user.uid };
    const headers = {
      token: token,
    };
    const response = await axios.post(url, info, { headers });
    const data = response.data as AllUsersInterface;
    return data;
  } catch (err: any) {
    return { ok: err.response.data.ok, msg: err?.response.data.msg };
  }
};
