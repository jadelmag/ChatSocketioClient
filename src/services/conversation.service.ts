import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "src/constants/network.constants";
import { ErrorResponseInterface } from "src/interfaces/error.interface";
import { ConversationResponseInterface } from "src/interfaces/conversation.interface";

export const createConversation = async (
  uuidMe: string,
  uuidUser: string,
  token: string
): Promise<ConversationResponseInterface | ErrorResponseInterface> => {
  try {
    const url = `${BASE_URL}/conversation/new`;
    const data = {
      senderId: uuidMe,
      receiverId: uuidUser,
    };
    const headers = {
      token: token,
    };
    const response: AxiosResponse<any, any> = await axios.post(url, data, {
      headers,
    });
    return response.data;
  } catch (error: any) {
    return { ok: error.response.data.ok, msg: error.response.data.msg };
  }
};

export const findConversationBetweenTwoMembers = async (
  uuidMe: string,
  uuidUser: string,
  token: string
): Promise<ConversationResponseInterface | ErrorResponseInterface> => {
  try {
    const url = `${BASE_URL}/conversation/find/${uuidMe}/${uuidUser}`;
    const headers = {
      token: token,
    };
    const response: AxiosResponse<any, any> = await axios.get(url, { headers });
    const conversation: ConversationResponseInterface =
      response.data as ConversationResponseInterface;
    return conversation;
  } catch (error: any) {
    return { ok: error.response.data.ok, msg: error.response.data.msg };
  }
};
