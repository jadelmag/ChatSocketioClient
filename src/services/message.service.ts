import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "src/constants/network.constants";
import { ErrorResponseInterface } from "src/interfaces/error.interface";
import {
  MessageAddedResponseInterface,
  MessageResponseInterface,
  MessageSendedInterface,
} from "src/interfaces/message.interface";

export const getMessages = async (
  conversationId: string,
  token: string
): Promise<MessageResponseInterface | ErrorResponseInterface> => {
  try {
    const url = `${BASE_URL}/messages/${conversationId}`;
    const headers = {
      token: token,
    };
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (err: any) {
    return { ok: err.response.data.ok, msg: err?.response.data.msg };
  }
};

export const addMessage = async (
  message: MessageSendedInterface,
  token: string
): Promise<MessageAddedResponseInterface | ErrorResponseInterface> => {
  try {
    const url = `${BASE_URL}/messages`;
    const headers = {
      token: token,
    };
    const response: AxiosResponse<any, any> = await axios.post(url, message, {
      headers,
    });
    const data: MessageAddedResponseInterface =
      response.data as MessageAddedResponseInterface;
    return data;
  } catch (err: any) {
    return { ok: err.response.data.ok, msg: err?.response.data.msg };
  }
};
