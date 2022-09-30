import { createContext } from "react";

const UserContext = createContext({
  uid: "",
  username: "",
  email: "",
  image: "",
  token: "",
});

export default UserContext;
