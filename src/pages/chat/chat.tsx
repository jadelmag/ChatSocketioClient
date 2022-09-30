/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "src/components/navbar";
import ChatContainer from "src/components/container";
import ChatScreen from "src/components/chatscreen";
import Wellcome from "src/components/wellcome";
import ChatConversation from "src/components/chat-conversation/index";
import { ChatList } from "src/components/chat-list";
import ImagePNG from "src/assets/default.png";
import LogoPNG from "src/assets/robot.gif";
import { getAllUsersService } from "src/services/allusers.service";
import {
  AllUsersInterface,
  UserDBInterface,
  UserSocketInterface,
} from "src/interfaces/user.interface";
import { createConversation } from "src/services/conversation.service";
import { ErrorResponseInterface } from "src/interfaces/error.interface";
import UserContext from "src/context";
import {
  updateToken,
  clearUser,
  getUser,
  getToken,
} from "src/services/storage.serveice";
import { io } from "socket.io-client";

export default function Chat() {
  const navigate = useNavigate();
  const loggedUser: UserDBInterface = getUser();
  const token: string = getToken()!;

  const [users, setUsers] = useState<UserDBInterface[]>([]);
  const [userSelected, setUserSelected] = useState<UserDBInterface | undefined>(
    undefined
  );
  const [loggedUsers, setLoggedUsers] = useState<any>(null);
  const [socket, setSocket] = useState<any>(null);

  const handleConversation = (email: string): void => {
    const currentUser = users.find((u: UserDBInterface) => u.email === email);
    setUserSelected(currentUser);
  };

  const handleUsers = (users: UserDBInterface[]) => {
    setUsers(users);
  };

  const onLogout = () => {
    clearUser();
    socket.disconnect();
    navigate("/login");
  };

  useEffect(() => {
    setSocket(io("ws://localhost:8900"));
  }, []);

  useEffect(() => {
    try {
      if (socket) {
        socket.emit("addUser", loggedUser.uid);
        socket.on("getUsers", (users: UserSocketInterface[]) => {
          setLoggedUsers(users);
        });
      }
    } catch (error: any) {
      throw Error("Socket getUsers errros!!");
    }
  }, [socket]);

  useEffect(() => {
    const getAllUsers = async () => {
      const response: AllUsersInterface | ErrorResponseInterface =
        await getAllUsersService();
      if (response.ok) {
        const users = (response as AllUsersInterface).users;
        setUsers(users);
        const dbToken = (response as AllUsersInterface).token;
        updateToken(dbToken);
      }
    };
    getAllUsers();
  }, []);

  useEffect(() => {
    const createConversations = () => {
      users.forEach(async (user) => {
        await createConversation(loggedUser.uid, user.uid, token);
      });
    };
    createConversations();
  }, [loggedUser.uid, users, token]);

  return (
    <>
      <UserContext.Provider
        value={{
          uid: loggedUser.uid,
          username: loggedUser.username,
          email: loggedUser.email,
          image: loggedUser.image,
          token: token,
        }}
      >
        <ChatContainer>
          <Navbar image={ImagePNG} onLogout={onLogout} />
          <ChatList
            users={users}
            loggedUsers={loggedUsers}
            onListUser={handleUsers}
            onConversation={handleConversation}
          />
          <ChatScreen>
            {userSelected ? (
              <ChatConversation user={userSelected} socket={socket} />
            ) : (
              <Wellcome logo={LogoPNG} />
            )}
          </ChatScreen>
        </ChatContainer>
      </UserContext.Provider>
    </>
  );
}
