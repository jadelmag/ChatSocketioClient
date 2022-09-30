export interface MessageInterface {
  _id: string;
  __v: number;
  text: string;
  sender: string;
  updatedAt: string;
  createdAt: string;
  conversationId: string;
}

export interface MessageSendedInterface {
  sender: string;
  text: string;
  conversationId: string | undefined;
}

export interface MessageResponseInterface {
  ok: boolean;
  messages: MessageInterface[];
}

export interface MessageAddedResponseInterface {
  ok: boolean;
  savedMessage: MessageInterface;
}
