/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { Message } from "src/components/message";
import { ChatConversationInterface } from "src/components/chat-conversation/interface";
import { findConversationBetweenTwoMembers } from "src/services/conversation.service";
import { addMessage, getMessages } from "src/services/message.service";
import { EnterCode } from "src/constants/keyboard.constants";
import { ConversationInterface } from "src/interfaces/conversation.interface";
import { MessageInterface } from "src/interfaces/message.interface";
import DefaultImage from "src/assets/default.png";
import useUser from "src/hooks/useUser";
import "./chat-conversation.scss";

export const ChatConversation = ({
  user,
  socket,
}: ChatConversationInterface): JSX.Element => {
  const scrollRef: React.MutableRefObject<any> = useRef();
  const userCtx = useUser();

  const [newMessage, setNewMessage] = useState<string>("");
  const [conversation, setConversation] = useState<
    ConversationInterface | undefined
  >(undefined);
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [socketMessage, setSocketMessage] = useState<any>(null);

  useEffect(() => {
    const getConversation = async () => {
      const response: any = await findConversationBetweenTwoMembers(
        userCtx.uid,
        user.uid,
        userCtx.token
      );
      if (response.ok) {
        setConversation(response.conversation);
      }
    };
    getConversation();
  }, []);

  useEffect(() => {
    const updateMessages = async () => {
      if (conversation) {
        const response: any = await getMessages(
          conversation.uid,
          userCtx.token
        );
        if (response.ok) {
          setMessages(response.messages);
        }
      }
    };
    updateMessages();
  }, [conversation]);

  useEffect(() => {
    try {
      if (socket) {
        socket.on("getMessage", (data: any) => {
          setSocketMessage({
            sender: data.senderId,
            text: data.text,
            createdAt: Date.now(),
          });
        });
      }
    } catch (error) {
      throw Error("Socket getMessage errros!!");
    }
  }, [socket, messages]);

  useEffect(() => {
    if (socketMessage && conversation?.members.includes(socketMessage.sender)) {
      setMessages([...messages, socketMessage]);
    }
  }, [socketMessage]);

  const onHandleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentMessage: string = event.target.value;
    setNewMessage(currentMessage);
  };

  const onHandleKey = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const code = event.keyCode;
    if (code === EnterCode) {
      const message = {
        sender: userCtx.uid,
        text: newMessage,
        conversationId: conversation?.uid,
      };

      const emitMessage = {
        senderId: userCtx.uid,
        receiverId: user.uid,
        text: newMessage,
      };
      socket.emit("sendMessage", emitMessage);

      try {
        const response: any = await addMessage(message, userCtx.token);
        if (response.ok) {
          const messageDB = response.savedMessage;
          setMessages([...messages, messageDB]);
          setNewMessage("");
        }
      } catch (err) {
        throw Error("error sending message");
      }
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth " });
  }, [messages]);

  return (
    <div className="chat-conversation">
      <div className="chat-conversation__messages">
        {messages.map((message: MessageInterface, index: number) => (
          <div ref={scrollRef} key={`${index}-${message}`}>
            <Message
              image={DefaultImage}
              message={message}
              own={message.sender === userCtx.uid}
            />
          </div>
        ))}
      </div>
      <div className="chat-conversation__chat-input-message">
        <input
          type="text"
          value={newMessage}
          onChange={onHandleMessage}
          onKeyUp={onHandleKey}
          placeholder="Write a message..."
        />
      </div>
    </div>
  );
};

export default ChatConversation;
