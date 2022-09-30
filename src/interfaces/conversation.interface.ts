export interface ConversationInterface {
  __v: number;
  uid: string;
  members: [string, string];
  updatedAt: string;
  createdAt: string;
}

export interface ConversationResponseInterface {
  ok: boolean;
  conversation: ConversationInterface;
}
