export interface ChartUserInterface {
  uid?: string;
  username: string;
  image?: string;
  email: string;
  logged?: boolean;
  onSelectedConversation: (email: string) => void;
}
