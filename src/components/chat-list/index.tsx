import ChatUser from "src/components/chat-user";
import Search from "src/components/search";
import { ChartListInterface } from "src/components/chat-list/interface";
import { UserDBInterface } from "src/interfaces/user.interface";
import "./chat-list.scss";

export const ChatList = ({
  users,
  loggedUsers,
  onListUser,
  onConversation,
}: ChartListInterface): JSX.Element => {
  return (
    <div className="chat-list">
      <Search users={users} onListUser={onListUser} />
      {loggedUsers &&
        users.map((user: UserDBInterface, index: number) => {
          const userLogged = loggedUsers.find((l) => l.userId === user.uid);
          return (
            <ChatUser
              key={`${index}-${user.username}`}
              username={user.username}
              email={user.email}
              image={user.image}
              logged={userLogged ? true : false}
              onSelectedConversation={onConversation}
            />
          );
        })}
    </div>
  );
};

export default ChatList;
