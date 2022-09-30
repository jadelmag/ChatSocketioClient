export interface MessageInterface {
  own: boolean;
  image: string;
  message: {
    text: string;
    createdAt: string;
  };
}
